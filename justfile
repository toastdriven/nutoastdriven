# https://just.systems/
set dotenv-load := true

@_default:
    just --list

@build:
    npm run build

@upload:
    rsync -av -e ssh out/ $BLOG_USER@$BLOG_HOST:/home/toastdriven.com/

@refresh: build upload
