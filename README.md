
# Aptos

## Contract

### Setup Account

```
aptos init --network devnet
```

https://explorer.aptoslabs.com/?network=devnet

then,

```
[addresses]
dacatirs_addr='<default-profile-account-address>'
```

### Publish

```
aptos move compile
aptos move publish
```


# Client

update `dapp/constants.ts`

```
cd dapp
yarn
yarn dev
```
