# Jobs-Web

## Architecture

![architecture](./README/serverless-next-architecture.png)

## [x] 1. Next.js CI/CD on AWS with GitHub Actions

* [x] AWS IAM >> Policies: README/`ServerlessPolicy.json`
* [x] Github >> Settings => Secret: `AWS_ACCESS_KEY_ID` & `AWS_SECRET_ACCESS_KEY` & `AWS_SECRET_REGION`
* [x] S3 bucket policy: README/`S3-bucket-policy.json`


```
npx create-next-app jobs-web

git init
git remote add origin https://github.com/nnthanh101/Jobs-Web.git
git push -u origin main
```

```
yarn dev
yarn start
```

* [ ] Fix YARN security alert on Github: `yarn upgrade-interactive --latest`

### AWS Permissions for deployment

```
  "acm:DescribeCertificate", // only for custom domains
  "acm:ListCertificates",    // only for custom domains
  "acm:RequestCertificate",  // only for custom domains
  "cloudfront:CreateCloudFrontOriginAccessIdentity",
  "cloudfront:CreateDistribution",
  "cloudfront:CreateInvalidation",
  "cloudfront:GetDistribution",
  "cloudfront:GetDistributionConfig",
  "cloudfront:ListCloudFrontOriginAccessIdentities",
  "cloudfront:ListDistributions",
  "cloudfront:ListDistributionsByLambdaFunction",
  "cloudfront:ListDistributionsByWebACLId",
  "cloudfront:ListFieldLevelEncryptionConfigs",
  "cloudfront:ListFieldLevelEncryptionProfiles",
  "cloudfront:ListInvalidations",
  "cloudfront:ListPublicKeys",
  "cloudfront:ListStreamingDistributions",
  "cloudfront:UpdateDistribution",
  "cloudfront:TagResource",         // for adding tags
  "cloudfront:UntagResource",       // for adding tags
  "cloudfront:ListTagsForResource", // for adding tags
  "iam:AttachRolePolicy",
  "iam:CreateRole",
  "iam:CreateServiceLinkedRole",
  "iam:GetRole",
  "iam:PutRolePolicy",
  "iam:PassRole",
  "lambda:CreateFunction",
  "lambda:EnableReplication",
  "lambda:DeleteFunction",            // only for custom domains
  "lambda:GetFunction",
  "lambda:GetFunctionConfiguration",
  "lambda:PublishVersion",
  "lambda:UpdateFunctionCode",
  "lambda:UpdateFunctionConfiguration",
  "lambda:ListTags",                  // for tagging lambdas
  "lambda:TagResource",               // for tagging lambdas
  "lambda:UntagResource",             // for tagging lambdas
  "route53:ChangeResourceRecordSets", // only for custom domains
  "route53:ListHostedZonesByName",
  "route53:ListResourceRecordSets",   // only for custom domains
  "s3:CreateBucket",
  "s3:GetAccelerateConfiguration",
  "s3:GetObject",                     // only if persisting state to S3 for CI/CD
  "s3:ListBucket",
  "s3:PutAccelerateConfiguration",
  "s3:PutBucketPolicy",
  "s3:PutObject"
  "s3:PutBucketTagging",              // for tagging buckets
  "s3:GetBucketTagging",              // for tagging buckets
  "lambda:ListEventSourceMappings",
  "lambda:CreateEventSourceMapping",
  "iam:UpdateAssumeRolePolicy",
  "iam:DeleteRolePolicy",
  "sqs:CreateQueue", // SQS permissions only needed if you use Incremental Static Regeneration. Corresponding SQS.SendMessage permission needed in the Lambda role
  "sqs:DeleteQueue",
  "sqs:GetQueueAttributes",
  "sqs:SetQueueAttributes"
```