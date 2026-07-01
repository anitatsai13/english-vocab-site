# -*- coding: utf-8 -*-
# Syncs the main HTML to the upload folder and deploys it to Netlify via API.
# Run: uv run --python 3.12 python C:\Users\anita\netlify_deploy.py
import io, os, shutil, zipfile, json, urllib.request
TOKEN=io.open(r"C:\Users\anita\.netlify_deploy_token",encoding="ascii").read().strip()
SITE_NAME="ai-english-415e25"
MAIN=r"C:\Users\anita\OneDrive\Desktop\網頁\英文單字學習網.html"
FOLDER=r"C:\Users\anita\OneDrive\Desktop\claude\單字學習網_上傳"

os.makedirs(FOLDER, exist_ok=True)
shutil.copyfile(MAIN, os.path.join(FOLDER,"index.html"))

def api(url, data=None, ctype=None):
    req=urllib.request.Request(url, data=data)
    req.add_header("Authorization","Bearer "+TOKEN)
    if ctype: req.add_header("Content-Type",ctype)
    return urllib.request.urlopen(req)

sites=json.load(api("https://api.netlify.com/api/v1/sites?per_page=100"))
site=next((s for s in sites if s.get("name")==SITE_NAME), None)
if not site: raise SystemExit("Site not found: "+SITE_NAME)
sid=site["id"]
buf=io.BytesIO()
with zipfile.ZipFile(buf,"w",zipfile.ZIP_DEFLATED) as z:
    for fn in os.listdir(FOLDER):
        fp=os.path.join(FOLDER,fn)
        if os.path.isfile(fp): z.write(fp, arcname=fn)
d=json.load(api("https://api.netlify.com/api/v1/sites/%s/deploys"%sid, data=buf.getvalue(), ctype="application/zip"))
print("deployed:",d.get("state"),"->",site.get("ssl_url"))
