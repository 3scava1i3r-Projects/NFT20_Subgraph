"use strict";
exports.__esModule = true;
exports.handleWithdraw = exports.handleTransfer = exports.handleApproval = void 0;
var graph_ts_1 = require("@graphprotocol/graph-ts");
var NFT20Pair_1 = require("../generated/NFT20Pair/NFT20Pair");
var schema_1 = require("../generated/schema");
function handleApproval(event) {
    // Entities can be loaded from the store using a string ID; this ID
    // needs to be unique across all entities of the same type
    var entity = schema_1.pair.load(event.transaction.from.toHex());
    // Entities only exist after they have been saved to the store;
    // `null` checks allow to create entities on demand
    if (entity == null) {
        entity = new schema_1.pair(event.transaction.from.toHex());
        // Entity fields can be set using simple assignments
        entity.count = graph_ts_1.BigInt.fromI32(0);
    }
    // BigInt and BigDecimal math are supported
    entity.count = entity.count + graph_ts_1.BigInt.fromI32(1);
    // Entity fields can be set based on event parameters
    entity.owner = event.params.owner;
    entity.spender = event.params.spender;
    var NFTentity = schema_1.NFT.load(event.transaction.from.toHex());
    if (NFTentity == null) {
        NFTentity = new schema_1.NFT(event.transaction.from.toHex());
    }
    var paircontract = NFT20Pair_1.NFT20Pair.bind(event.address);
    NFTentity.type = paircontract.getInfos().value0;
    NFTentity.name = paircontract.getInfos().value1;
    NFTentity.symbol = paircontract.getInfos().value2;
    NFTentity.supply = paircontract.getInfos().value3;
    // Entities can be written to the store with `.save()`
    entity.save();
    NFTentity.save();
    // Note: If a handler doesn't require existing field values, it is faster
    // _not_ to load the entity from the store. Instead, create it fresh with
    // `new Entity(...)`, set the fields that should be updated and save the
    // entity back to the store. Fields that were not set or unset remain
    // unchanged, allowing for partial updates to be applied.
    // It is also possible to access smart contracts from mappings. For
    // example, the contract that has emitted the event can be connected to
    // with:
    //
    // let contract = Contract.bind(event.address)
    //
    // The following functions can then be called on this contract to access
    // state variables and other data:
    //
    // - contract.allowance(...)
    // - contract.approve(...)
    // - contract.balanceOf(...)
    // - contract.bytesToAddress(...)
    // - contract.decimals(...)
    // - contract.decreaseAllowance(...)
    // - contract.factory(...)
    // - contract.getInfos(...)
    // - contract.increaseAllowance(...)
    // - contract.name(...)
    // - contract.nftAddress(...)
    // - contract.nftType(...)
    // - contract.nftValue(...)
    // - contract.onERC1155BatchReceived(...)
    // - contract.onERC1155Received(...)
    // - contract.onERC721Received(...)
    // - contract.supportsInterface(...)
    // - contract.symbol(...)
    // - contract.totalSupply(...)
    // - contract.track1155(...)
    // - contract.transfer(...)
    // - contract.transferFrom(...)
}
exports.handleApproval = handleApproval;
function handleTransfer(event) { }
exports.handleTransfer = handleTransfer;
function handleWithdraw(event) { }
exports.handleWithdraw = handleWithdraw;
