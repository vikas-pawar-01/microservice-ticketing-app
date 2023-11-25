# ticketing app

### Setup

- Ingress-Nginx Controller: https://kubernetes.github.io/ingress-nginx/deploy/

- Auth

  - docker build -t vpawar01/auth .
  - docker push vpawar01/auth

- Client

  - docker build -t vpawar01/client .
  - docker push vpawar01/client

- skaffold dev

  - if get an error - run same command 2 times

- Add hosts entry

  - 127.0.0.1 ticketing.dev
  - 127.0.0.1 posts.com

- Add k8s secrets
  - kubectl create secret generic jwt-secret --from-literal=JWT_KEY=123

### Google Cloud Setup for using server containers instead local (like in case memory issue on local)

- Install google cloud sdk https://cloud.google.com/sdk/docs/install
- Check installation successfully by running CMD
  - gcloud
- gcloud auth login
- gcloud init
- gcloud container clusters get-credentials ticketing-dev
- If get an error for above coomand gke-gcloud-auth-plugin
  - gcloud components install gke-gcloud-auth-plugin
  - gke-gcloud-auth-plugin --version
- gcloud container clusters get-credentials ticketing-dev
- kubectl get pods

### Steps

- Enable Google Cloud Build
- Update the skaffold.yaml file to use Google Cloud Build
- Setup ingress-nginx on our google cloud cluser kubernetes.github.io/ingress-nginx
- Update our hosts file again to point the remote cluster
- Restart skaffold

### Error:

- Homebrew or packages getting error

  - Add google dns 8.8.8.8

- error from server (InternalError): error when creating "STDIN": Internal error occurred: failed calling webhook "validate.nginx.ingress.kubernetes.io": failed to call webhook: Post "https://ingress-nginx-controller-admission.ingress-nginx.svc:443/networking/v1/ingresses?timeout=10s": dial tcp 10.110.198.221:443: connect: connection refused

  - kubectl delete -A ValidatingWebhookConfiguration ingress-nginx-admission

- ERROR [internal] load metadata for docker.io/library/node:alpine
  - rm ~/.docker/config.json
  - sudo rm -rf ~/.docker/buildx
  - docker logout && docker login
