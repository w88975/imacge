#!/bin/bash

if [ ! -d "framework" ]; then
    mkdir framework
fi

if [ ! -d "framework/quark-shell-mac" ]; then
    cd framework
    git clone https://github.com/HackPlan/quark-shell-mac
fi

cd app/js
wget https://github.com/w88975/qiniu-token/releases/download/0.01/qiniu-token.min.js

if [ -f "/usr/bin/pod" ];
    then
        cd framework/quark-shell-mac
        pod setup
        pod install
    else
        sudo gem install cocoapods
        cd framework/quark-shell-mac
        pod setup
        pod install
fi
