//test.js
var ENS = artifacts.require("ENS");

contract('ENS', function(accounts) {
  it("markledev.eth is available to reserve", function() {
  	var ens_deployed;
    return ENS.deployed().then(function(instance) {
    	//console.log(instance);
    	ens_deployed = instance;
      return instance.getOwner.call('markledev');
    })
    .then(function(ownerAddress) {
    	assert.equal(ownerAddress, '0x0000000000000000000000000000000000000000');
    })
  });

  it(`${accounts[0]} reserves the name markledev.eth`, function() {
  	var ens_deployed;
  	return ENS.deployed().then(function(instance) {
  		ens_deployed = instance;
  		return instance.reserveName('markledev', {from: accounts[0], value: 20000});
  	}).then(function() {
  		return ens_deployed.getHighestBidder.call('markledev');
  	}).then(function(highestBidder) {
  		assert.equal(highestBidder, accounts[0]);
  	})
  })

  it(`${accounts[0]} is not yet the official owner of markledev.eth`, function() {
  	var ens_deployed;
  	return ENS.deployed().then(function(instance) {
  		ens_deployed = instance;
  		return instance.getOwner.call('markledev');
  	}).then(function(owner){
  		assert.equal(owner, '0x0000000000000000000000000000000000000000');
  	})
  })

  it(`${accounts[0]} is currently the highest bidder of markledev.eth`, function() {
  	var ens_deployed;
  	return ENS.deployed().then(function(instance) {
  		ens_deployed = instance;
  		return instance.getHighestBidder.call('markledev');
  	}).then(function(highestBidder) {
  		assert.equal(highestBidder, accounts[0]);
  	})
  })

  it(`${accounts[2]} makes a higher bid for markledev.eth`, function() {
  	var ens_deployed;
  	return ENS.deployed().then(function(instance) {
  		ens_deployed = instance;
  		return instance.reserveName('markledev', {from: accounts[2], value: 40000});
  	}).then(function() {
  		return ens_deployed.getHighestBidder.call('markledev');
  	}).then(function(highestBidder) {
  		assert.equal(highestBidder, accounts[2]);
  	})
  })

  it(`${accounts[0]} cannot successfully claims ownership of markledev.eth`, function() {
  	var ens_deployed;
  	return ENS.deployed().then(function(instance) {
  		ens_deployed = instance;
  		return instance.claimOwnership('markledev', {from: accounts[0]});
  	}).then(function() {
  		return ens_deployed.getOwner.call('markledev');
  	}).then(function(ownerAddress) {
  	}, function(error) {
  		assert.match(error, /VM Exception while processing transaction: revert/);
  	})
  })

  it(`${accounts[2]} successfully claims ownership of markledev.eth`, function() {
  	var ens_deployed;
  	return ENS.deployed().then(function(instance) {
  		ens_deployed = instance;
  		return instance.claimOwnership('markledev', {from: accounts[2]});
  	}).then(function() {
  		return ens_deployed.getOwner.call('markledev');
  	}).then(function(ownerAddress) {
  		assert.equal(ownerAddress, accounts[2]);
  	})
  })

  it(`${accounts[1]} send 100000 wei to owner of markledev`, function() {
  	var ens_deployed;
  	var old_value;
  	var new_value;
  	return ENS.deployed().then(function(instance) {
  		ens_deployed = instance;
  		old_value = web3.eth.getBalance(accounts[2]);
  		return instance.sendEther('markledev', 110000, {from: accounts[1], value: 120000});
  	}).then(function() {
  		new_value = web3.eth.getBalance(accounts[2]);
  		assert.isAbove(new_value.toNumber() - old_value.toNumber(), 100000);
  	});
  })

  it(`${accounts[2]} release the name markledev to the public again`, function() {
  	var ens_deployed;
  	return ENS.deployed().then(function(instance) {
  		ens_deployed = instance;
  		return instance.releaseName('markledev', {from: accounts[2]});
  	}).then(function() {
  		return ens_deployed.getOwner.call('markledev');
  	}).then(function(ownerAddress) {
  		return assert.equal(ownerAddress, '0x0000000000000000000000000000000000000000');
  	})
  })
})