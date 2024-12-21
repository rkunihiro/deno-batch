#!/bin/bash

awslocal s3 mb s3://test-bucket

awslocal s3 ls

awslocal s3 ls s3://test-bucket
