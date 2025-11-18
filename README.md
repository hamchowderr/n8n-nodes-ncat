# n8n-nodes-nca-toolkit

This is an n8n community node that integrates with the [No Code Architects Toolkit API](https://github.com/stephengpope/no-code-architects-toolkit). It provides comprehensive media processing capabilities including video, audio, and image manipulation directly in your n8n workflows.

[n8n](https://n8n.io/) is a fair-code licensed workflow automation platform.

## Table of Contents

- [Installation](#installation)
- [Prerequisites](#prerequisites)
- [Operations](#operations)
- [Credentials](#credentials)
- [Usage Examples](#usage-examples)
- [Compatibility](#compatibility)
- [Resources](#resources)

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

### Community Nodes (Self-Hosted)

1. Go to **Settings** > **Community Nodes**
2. Select **Install**
3. Enter `n8n-nodes-ncat` in the **Enter npm package name** field
4. Agree to the [risks](https://docs.n8n.io/integrations/community-nodes/risks/) of using community nodes
5. Select **Install**

After installing the node, you can use it like any other node in your workflows.

## Prerequisites

You need a running instance of the No Code Architects Toolkit API. The toolkit is a self-hosted media processing API that handles video, audio, and image operations.

- **NCA Toolkit Repository**: https://github.com/stephengpope/no-code-architects-toolkit
- **API Key**: Required for authentication
- **Base URL**: The URL where your NCA Toolkit API is hosted

## Operations

### Media Operations

- **Transcribe**: Convert audio/video to text using Whisper AI
- **Convert to MP3**: Convert any audio/video file to MP3 format
- **Convert**: Convert media files between different formats
- **Get Metadata**: Extract metadata from media files
- **Detect Silence**: Detect silent segments in audio/video files

### Video Operations

- **Add Captions**: Add subtitles/captions to videos with extensive styling options
- **Trim**: Trim videos by specifying start and end times
- **Split**: Split a video into multiple segments
- **Cut**: Remove specific segments from a video
- **Concatenate**: Join multiple videos together
- **Extract Thumbnail**: Extract a thumbnail image from a video at a specific time

### Audio Operations

- **Concatenate**: Join multiple audio files together

### S3 Operations

- **Upload**: Upload files to S3-compatible storage

### Status Operations

- **Get Job Status**: Check the status of an asynchronous processing job
- **Get All Jobs Status**: Retrieve status of all jobs within a time range

## Credentials

To use this node, you need to configure the **NCA Toolkit API** credentials:

1. In n8n, go to **Credentials** > **New**
2. Search for "NCA Toolkit API"
3. Enter your credentials:
   - **API Key**: Your NCA Toolkit API key
   - **Base URL**: The base URL of your NCA Toolkit instance (e.g., `https://your-nca-toolkit.com`)

### Testing Credentials

The node includes a built-in credential test that verifies your API key and base URL by calling the `/v1/toolkit/authenticate` endpoint.

## Usage Examples

### Example 1: Transcribe Audio File

This workflow transcribes an audio file to text:

1. Add the **NCA Toolkit** node
2. Select **Resource**: Media Operation
3. Select **Operation**: Transcribe
4. **Media URL**: Enter the URL to your audio/video file
5. **Model** (optional): Choose transcription model (default: base)
6. Configure **Response Options**:
   - Include Text
   - Include SRT
   - Word Timestamps
7. Set **Webhook URL** to receive results asynchronously (optional)

### Example 2: Add Captions to Video

This workflow adds styled captions to a video:

1. Add the **NCA Toolkit** node
2. Select **Resource**: Video Processing
3. Select **Operation**: Add Captions
4. **Video URL**: Enter the URL to your video file
5. **Captions**: Enter your caption text or SRT format
6. Configure **Settings** (optional):
   - Font Family: "Arial"
   - Font Size: 24
   - Word Color: #FFFFFF (white)
   - Outline Color: #000000 (black)
   - Position: Bottom Center
   - Max Words Per Line: 8

### Example 3: Video Processing Pipeline

Create a multi-step video processing workflow:

1. **Trim Video**
   - Resource: Video Processing
   - Operation: Trim
   - Start: 0
   - End: 30

2. **Add Captions**
   - Resource: Video Processing
   - Operation: Add Captions
   - Use output from previous step

3. **Extract Thumbnail**
   - Resource: Video Processing
   - Operation: Extract Thumbnail
   - Second: 5

### Example 4: Batch Audio Conversion

Convert multiple audio files to MP3:

1. Add a trigger node to get file URLs
2. Add **NCA Toolkit** node
3. Select **Resource**: Media Operation
4. Select **Operation**: Convert to MP3
5. **Media URL**: `{{ $json.fileUrl }}`
6. Configure **Conversion Options**:
   - Audio Bitrate: 192k
   - Audio Codec: libmp3lame

### Example 5: Asynchronous Processing with Webhooks

For long-running operations, use webhooks:

1. Add a **Webhook** node to receive results
2. Copy the webhook URL
3. Add **NCA Toolkit** node
4. Configure your operation (e.g., Transcribe)
5. Set **Webhook URL** to your webhook URL
6. Add **Custom Job ID** to track the job
7. The API will POST results to your webhook when complete

### Example 6: Check Job Status

Monitor processing jobs:

1. Add **NCA Toolkit** node
2. Select **Resource**: Status
3. Select **Operation**: Get Job Status
4. **Job ID**: Enter the job ID from a previous operation
5. The node returns current status: pending, processing, completed, or failed

## Compatibility

- **Minimum n8n version**: 0.154.0
- **Tested with n8n version**: 1.113.3

## Resources

- [n8n community nodes documentation](https://docs.n8n.io/integrations/community-nodes/)
- [NCA Toolkit API Documentation](https://github.com/stephengpope/no-code-architects-toolkit)
- [Repository](https://github.com/hamchowderr/n8n-nodes-ncat)

## License

[MIT](LICENSE.md)

## Support

For issues, questions, or contributions, please visit the [GitHub repository](https://github.com/hamchowderr/n8n-nodes-ncat/issues).

## Version History

### 0.1.0 (Initial Release)

- Media operations: transcribe, convert to MP3, convert, metadata, silence detection
- Video operations: caption, trim, split, cut, concatenate, thumbnail extraction
- Audio operations: concatenate
- S3 operations: upload to S3-compatible storage
- Status operations: job status checking, bulk status retrieval
- Async/sync processing modes with webhook support
- Comprehensive parameter validation and sensible defaults
