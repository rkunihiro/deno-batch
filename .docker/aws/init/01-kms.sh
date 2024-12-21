#!/bin/bash

awslocal kms create-key \
    --tags '[
        {"TagKey":"_custom_id_","TagValue":"00000000-0000-0000-0000-000000000001"},
        {"TagKey":"_custom_key_material_","TagValue":"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA="}
    ]'

awslocal kms create-alias \
    --alias-name alias/test-key \
    --target-key-id "00000000-0000-0000-0000-000000000001"

awslocal kms describe-key \
    --key-id alias/test-key
