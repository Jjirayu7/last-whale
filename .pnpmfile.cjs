export const hooks = {
  readPackage(pkg) {
    process.env.NPM_CONFIG_FROZEN_LOCKFILE = "false";
    return pkg;
  },
};
