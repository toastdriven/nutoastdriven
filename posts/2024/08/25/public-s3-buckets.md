---
title: 'Public S3 Buckets'
date: '2024-08-25'
time: '09:36:11'
author: 'Daniel'
slug: 'public-s3-buckets'
---

Back in _"the day"_, when S3 was introduced, it was very easy to host your public-facing assets in (& very difficult to put anything private there).

In 2024, the situation feels reversed. Everything is private by default (which, security-wise, is a Good Thing™), but it's a little non-obvious how to get back that "SHARE ALL THE THINGS" functionality.

_(read: I had to work it out again, so I'm blogging it for future reference.)_


## The Process

We need to take a couple steps in order to enable public access.

1. Make a public bucket (buckets are private by default)
2. Un-block public access (blocked by default)
3. Add a bucket policy (to allow public read operations)
4. Add a CORS policy (to allow the cross-domain sharing)

Let's break it down.

### Make the Bucket

This one is pretty straight-forward. You can create the bucket through a variety of means, such as the [Console](https://console.aws.amazon.com/) or the [AWS CLI](https://aws.amazon.com/cli/).

Pick your region, name your bucket (still has to be globally unique), disable ACLs. Then whatever you want for versioning, tags, the server-side encryption (at-rest).

### Un-Block Public Access

This is an option during creation (via the console), but I wanted to cover it separately, as this is one of the "make-public" differences.

To change this, I used the [Console](https://console.aws.amazon.com/), going to
**Console** -> **S3** -> **Buckets** -> My New Bucket -> **Permissions** tab. Get comfy, because the next couple steps are all here too...

Find the _"Block Public Access"_ section, and uncheck the _"Block all public access"_ checkbox. This should also uncheck all checkboxes under it, which is what you want.

![Block Public Access Console UI](/img/blog/aws_block_all_public_access.png)

### Bucket Policy

Next, still in **Console** -> **S3** -> **Buckets** -> My New Bucket -> **Permissions** tab, we need to supply a bucket policy.

The bucket policy is essentially a configuration file for the various operations. Most importantly, since we want to enable publicly reading the specific objects, we need to handle the `GetObject` operation.

Make sure you customize the bucket name in the `ARN`!

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "PublicReadGetObject",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::<YOUR_BUCKET_NAME_HERE>/*"
        }
    ]
}
```

### Cross-Origin Resource Sharing (CORS) Policy

Finally, still in **Console** -> **S3** -> **Buckets** -> My New Bucket -> **Permissions** tab, we need to setup a CORS policy.

Custom syntax/structure, but nothing to crazy to this. Remember to customize the `AllowedOrigins` list!

```js
[
    {
        "AllowedHeaders": [
            "*"
        ],
        "AllowedMethods": [
            // Probably don't need `GET` here, but for complete-ness...
            "GET",
            "PUT",
            "POST",
            "DELETE"
        ],
        "AllowedOrigins": [
            // Let S3 respond to your local server.
            "http://0.0.0.0:8000",
            // And add your production domain as well.
            "http://whatsdinner.app"
        ],
        "ExposeHeaders": []
    }
]
```


## Conclusion

And finally, we can use our assets/static files from S3! Bask in the warm glow of your globally-available, publicly-readable blobs!
