export class DriveService {
  private accessToken: string;

  constructor(accessToken: string) {
    this.accessToken = accessToken;
  }

  private async fetchAPI(url: string, options: RequestInit = {}) {
    const headers = new Headers(options.headers || {});
    headers.append('Authorization', `Bearer ${this.accessToken}`);
    
    const response = await fetch(url, { ...options, headers });
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Drive API Error: ${response.status} ${errorText}`);
    }
    
    return response;
  }

  // Create a JSON file in the appDataFolder
  async saveAppData(filename: string, data: any) {
    // First, check if file exists
    const existingFileId = await this.getAppFileId(filename);
    
    const metadata = {
      name: filename,
      mimeType: 'application/json',
      parents: ['appDataFolder']
    };

    const form = new FormData();
    form.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }));
    form.append('file', new Blob([JSON.stringify(data)], { type: 'application/json' }));

    let url = 'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart';
    let method = 'POST';

    if (existingFileId) {
      url = `https://www.googleapis.com/upload/drive/v3/files/${existingFileId}?uploadType=multipart`;
      method = 'PATCH';
      // When updating, we don't necessarily need to pass parents in metadata, but it's safe.
    }

    const res = await this.fetchAPI(url, {
      method,
      body: form
    });
    
    return await res.json();
  }

  // Retrieve a JSON file from appDataFolder
  async getAppData(filename: string) {
    const fileId = await this.getAppFileId(filename);
    if (!fileId) return null;

    const res = await this.fetchAPI(`https://www.googleapis.com/drive/v3/files/${fileId}?alt=media`);
    return await res.json();
  }

  // Helper to find file by name in appDataFolder
  private async getAppFileId(filename: string): Promise<string | null> {
    const query = encodeURIComponent(`name='${filename}' and 'appDataFolder' in parents and trashed=false`);
    const res = await this.fetchAPI(`https://www.googleapis.com/drive/v3/files?spaces=appDataFolder&q=${query}&fields=files(id,name)`);
    const data = await res.json();
    
    if (data.files && data.files.length > 0) {
      return data.files[0].id;
    }
    return null;
  }
}
