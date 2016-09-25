#! /bin/bash/

git add --all .
timestamp=$(date "+%c")
git commit -m " npm commit at: $timestamp"
branchlist=$(git branch --list |grep "*" )
active=$(echo "$branchlist" | grep -o " .*" )
echo "$active"
git push origin $active