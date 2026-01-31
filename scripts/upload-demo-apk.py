#!/usr/bin/env python3
"""
Script to generate a demo APK file and upload it to S3 bucket.
This creates a minimal valid APK structure for testing purposes.

Usage: python scripts/upload-demo-apk.py
"""

import os
import sys
import zipfile
import tempfile
import boto3
from botocore.exceptions import ClientError, NoCredentialsError


def create_demo_apk(output_path):
    """
    Create a minimal demo APK file.
    An APK is essentially a ZIP file with specific structure and an AndroidManifest.xml.
    """
    print("📦 Creating demo APK file...")
    
    # Minimal AndroidManifest.xml content
    manifest_content = '''<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.example.remontpodklyuch.demo"
    android:versionCode="1"
    android:versionName="1.0.0">
    
    <uses-sdk
        android:minSdkVersion="21"
        android:targetSdkVersion="33" />
    
    <application
        android:label="Ремонт под ключ Demo"
        android:icon="@mipmap/ic_launcher"
        android:allowBackup="true">
        
        <activity
            android:name=".MainActivity"
            android:exported="true">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
    </application>
</manifest>'''
    
    # Create APK (ZIP archive) with proper structure
    try:
        with zipfile.ZipFile(output_path, 'w', zipfile.ZIP_DEFLATED) as apk:
            # Add AndroidManifest.xml
            apk.writestr('AndroidManifest.xml', manifest_content)
            
            # Add a minimal resources file
            apk.writestr('resources.arsc', b'Demo Resources')
            
            # Add META-INF directory (required for APK)
            apk.writestr('META-INF/MANIFEST.MF', 'Manifest-Version: 1.0\n')
            apk.writestr('META-INF/CERT.SF', 'Signature-Version: 1.0\n')
            apk.writestr('META-INF/CERT.RSA', b'Demo Certificate')
            
            # Add classes.dex (placeholder)
            apk.writestr('classes.dex', b'Demo DEX file')
            
            # Add res directory structure
            apk.writestr('res/values/strings.xml', 
                        '<?xml version="1.0" encoding="utf-8"?>\n'
                        '<resources>\n'
                        '    <string name="app_name">Ремонт под ключ Demo</string>\n'
                        '</resources>')
        
        file_size = os.path.getsize(output_path)
        print(f"✅ Demo APK created successfully ({file_size} bytes)")
        return True
        
    except Exception as e:
        print(f"❌ Error creating APK: {e}")
        return False


def upload_to_s3(file_path, bucket_name, object_key, endpoint_url):
    """
    Upload the APK file to S3 bucket.
    """
    print(f"\n☁️  Uploading to S3...")
    print(f"   Bucket: {bucket_name}")
    print(f"   Key: {object_key}")
    print(f"   Endpoint: {endpoint_url}")
    
    # Check for AWS credentials
    aws_access_key = os.environ.get('AWS_ACCESS_KEY_ID')
    aws_secret_key = os.environ.get('AWS_SECRET_ACCESS_KEY')
    
    if not aws_access_key or not aws_secret_key:
        print("❌ Error: AWS credentials not found in environment variables")
        print("   Please set AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY")
        return False
    
    try:
        # Initialize S3 client
        s3_client = boto3.client(
            's3',
            endpoint_url=endpoint_url,
            aws_access_key_id=aws_access_key,
            aws_secret_access_key=aws_secret_key
        )
        
        # Upload file with proper content type
        with open(file_path, 'rb') as file_data:
            s3_client.put_object(
                Bucket=bucket_name,
                Key=object_key,
                Body=file_data,
                ContentType='application/vnd.android.package-archive',
                ACL='public-read'  # Make it publicly accessible
            )
        
        # Construct CDN URL
        cdn_url = f"https://files.poehali.dev/{object_key}"
        
        print(f"✅ Upload successful!")
        print(f"\n🌐 CDN URL:")
        print(f"   {cdn_url}")
        print(f"\n📱 You can now download the APK from the URL above")
        
        return True
        
    except NoCredentialsError:
        print("❌ Error: Invalid AWS credentials")
        return False
    except ClientError as e:
        error_code = e.response['Error']['Code']
        error_message = e.response['Error']['Message']
        print(f"❌ S3 Client Error: {error_code} - {error_message}")
        return False
    except Exception as e:
        print(f"❌ Unexpected error during upload: {e}")
        return False


def main():
    """
    Main function to orchestrate APK creation and upload.
    """
    print("=" * 60)
    print("📱 Demo APK Generator and S3 Uploader")
    print("=" * 60)
    
    # Configuration
    BUCKET_NAME = 'files'
    OBJECT_KEY = 'mobile/remont-pod-klyuch.apk'
    ENDPOINT_URL = 'https://bucket.poehali.dev'
    
    # Create temporary APK file
    with tempfile.NamedTemporaryFile(suffix='.apk', delete=False) as tmp_file:
        tmp_apk_path = tmp_file.name
    
    try:
        # Step 1: Create demo APK
        if not create_demo_apk(tmp_apk_path):
            sys.exit(1)
        
        # Step 2: Upload to S3
        if not upload_to_s3(tmp_apk_path, BUCKET_NAME, OBJECT_KEY, ENDPOINT_URL):
            sys.exit(1)
        
        print("\n" + "=" * 60)
        print("✅ All operations completed successfully!")
        print("=" * 60)
        
    finally:
        # Cleanup temporary file
        if os.path.exists(tmp_apk_path):
            os.remove(tmp_apk_path)
            print(f"\n🧹 Cleaned up temporary file: {tmp_apk_path}")


if __name__ == '__main__':
    main()
