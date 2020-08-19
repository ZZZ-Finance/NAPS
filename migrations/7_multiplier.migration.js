const Multiplier = artifacts.require("Multiplier");
const zzz = "0xD794F7c87712cbf2349776fF618BE1231c6c9162";
const naps = "0xc9E5c5E9d1EAb2a5095ceB1769648b91E0a2e332";

module.exports = function (deployer) {
  deployer.deploy(Multiplier,[],zzz,naps);
};
