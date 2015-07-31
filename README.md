[![Build Status](https://travis-ci.org/innowatio/iwwa-lambda-kinesis-pipe.svg?branch=master)](https://travis-ci.org/innowatio/iwwa-lambda-kinesis-pipe)
[![Coverage Status](https://coveralls.io/repos/innowatio/iwwa-lambda-kinesis-pipe/badge.svg?branch=master&service=github)](https://coveralls.io/github/innowatio/iwwa-lambda-kinesis-pipe?branch=master)
[![Dependency Status](https://david-dm.org/innowatio/iwwa-lambda-kinesis-pipe.svg)](https://david-dm.org/innowatio/iwwa-lambda-kinesis-pipe)
[![devDependency Status](https://david-dm.org/innowatio/iwwa-lambda-kinesis-pipe/dev-status.svg)](https://david-dm.org/innowatio/iwwa-lambda-kinesis-pipe#info=devDependencies)

# iwwa-lambda-kinesis-pipe

Pipes one kinesis stream into another.

## Deployment

### Continuous deployment

Since the project uses TravisCI and
[`lambda-deploy`](https://github.com/innowatio/lambda-deploy/) for continuous
deployment, the following environment variables need to be set:

- `AWS_SECRET_ACCESS_KEY`
- `AWS_ACCESS_KEY_ID`
- `AWS_DEFAULT_REGION`
- `S3_BUCKET`
- `LAMBDA_NAME`
- `LAMBDA_ROLE_ARN`

WARNING: the value of those variables must be kept secret. Do not set them in
the `.travis.yml` config file, only in the Travis project's settings (where they
are kept secret).

### Configuration

The following environment variables are needed to configure the function:

- `TARGET_STREAM_NAME`

NOTE: since the project uses `lambda-deploy`, in the build environment (Travis)
we need to define the above variables with their name prefixed by
`__FUNC_CONFIG__`.
