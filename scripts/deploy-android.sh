#!/bin/bash

# ----------------------------------------------------
# Build and upload Google Play Console
# ----------------------------------------------------

# Bundle JS code
node_modules/react-native/cli.js bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle

cd android && \
./gradlew clean && \

# Clean up prior builds
rm -f app/app-release.aab && \

# Generate AAB file
./gradlew bundleRelease && \

# Generate aligned AAB
zipalign -v -p 4 app/build/outputs/bundle/release/app-release.aab app/app-release.aab
