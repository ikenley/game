from datetime import datetime
import os

import boto3

# Only use for local testing - in production, these should be set in the environment
# from dotenv import load_dotenv
# load_dotenv()  # reads variables from a .env file and sets them in os.environ

s3 = boto3.client('s3')
ssm = boto3.client('ssm')

BUCKET = os.getenv('SITE_BUCKET_NAME')
ACTIVE_VERSION_SSM_PARAM = os.getenv('ACTIVE_VERSION_SSM_PARAM')
KEEP_N = 3  # Number of recent versions to keep (excluding active)

def get_all_versions():
    # List all top-level prefixes (git hashes)
    response = s3.list_objects_v2(Bucket=BUCKET, Delimiter='/')
    prefixes = [p['Prefix'].rstrip('/') 
                for p in response.get('CommonPrefixes', [])]
    return prefixes

def get_version_metadata(prefix):
    response = s3.list_objects_v2(
        Bucket=BUCKET,
        Prefix=f"{prefix}/",
        MaxKeys=1
    )
    objects = response.get('Contents', [])
    if not objects:
        return datetime.min  # treat empty prefixes as oldest
    return objects[0]['LastModified']

def delete_prefix(prefix):
    paginator = s3.get_paginator('list_objects_v2')
    for page in paginator.paginate(Bucket=BUCKET, Prefix=f"{prefix}/"):
        objects = [{'Key': obj['Key']} for obj in page.get('Contents', [])]
        if objects:
            s3.delete_objects(Bucket=BUCKET, Delete={'Objects': objects})

def cleanup():
    versions = get_all_versions()
    print(f"Found versions: {versions}")
    
    # Sort by deploy timestamp stored in metadata
    versioned = [(v, get_version_metadata(v)) 
                 for v in versions]
    versioned.sort(key=lambda x: x[1], reverse=True)
    print("Versions sorted by deploy time:")
    for v, timestamp in versioned:
        print(f"  {v}: {timestamp}")
    
    # Keep the active version regardless of age
    active = ssm.get_parameter(Name=ACTIVE_VERSION_SSM_PARAM)['Parameter']['Value']
    print(f"Active version: {active}")
    
    to_delete = [v for v, _ in versioned[KEEP_N:] if v != active]
    print(f"Versions to delete: {to_delete}")
    
    for prefix in to_delete:
        print(f"Deleting old version: {prefix}")
        delete_prefix(prefix)

cleanup()