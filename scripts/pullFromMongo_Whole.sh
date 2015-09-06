#!/usr/bin/env bash
mongodump --db=emmaus --out=emmaus-db-$(date +%Y-%m-%d-%H-%M-%S)
