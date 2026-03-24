# scripts

Variaous utility scripts.

---

## scripts/delete_old_versions.py

This runs in CodeBuild during the deployment. It deletes all but the most recent "N" versions.

To run locally:
```
cd scripts/delete_old_versions
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.dev.txt
python3 delete_old_versions.py
```