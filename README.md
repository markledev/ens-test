# Run this code
Step 0a: Install truffle
```
yarn global add truffle
```

Step 0b: Install ganache-cli
```
yarn global add ganache-cli
```

Step 0c: Run local mini-blockchain with first 3 accounts unlocked and armed with 100 test ether.
```
ganache-cli -e -u 0 -u 1 -u 2
```

Step 1: Compile ENS.sol via truffle
```
truffle compile
```

Step 2: Deploy ENS to the blockchain
```
truffle migrate
```

Step 3: Run test cases based on business logic defined in ENS.sol
```
truffle test
```
