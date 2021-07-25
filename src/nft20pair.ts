import { BigInt } from "@graphprotocol/graph-ts"
import {
  NFT20Pair,
  Approval,
  Transfer,
  Withdraw
} from "../generated/NFT20Pair/NFT20Pair"
import { pair , NFT } from "../generated/schema"



export function handleApproval(event: Approval): void {
  // Entities can be loaded from the store using a string ID; this ID
  // needs to be unique across all entities of the same type
  let entity = pair.load(event.transaction.from.toHex())

  // Entities only exist after they have been saved to the store;
  // `null` checks allow to create entities on demand
  if (entity == null) {
    entity = new pair(event.transaction.from.toHex())

    // Entity fields can be set using simple assignments
    entity.count = BigInt.fromI32(0)
  }

  // BigInt and BigDecimal math are supported
  entity.count = entity.count + BigInt.fromI32(1)

  // Entity fields can be set based on event parameters
  entity.owner = event.params.owner
  entity.spender = event.params.spender


  let NFTentity = NFT.load(event.transaction.from.toHex())

  if (NFTentity == null) {
    NFTentity = new NFT(event.transaction.from.toHex())
  }

  let paircontract = NFT20Pair.bind(event.address)

  NFTentity.type = paircontract.getInfos().value0
  NFTentity.name = paircontract.getInfos().value1
  NFTentity.symbol = paircontract.getInfos().value2
  NFTentity.supply = paircontract.getInfos().value3


  // Entities can be written to the store with `.save()`
  entity.save()
  NFTentity.save()

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

export function handleTransfer(event: Transfer): void {}

export function handleWithdraw(event: Withdraw): void {}
