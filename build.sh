#!/bin/bash

rm -rf framework/quark-shell-mac/app/
cp -r app/ framework/quark-shell-mac/app
echo "copy app/ to framework/quark-shell-mac/app \nyou can build for your app"
open framework/quark-shell-mac/quark-shell.xcworkspace/
