#include "RNOH/PackageProvider.h"

using namespace rnoh;

// react-native-toast-message is a pure JS library — no native packages to register.
std::vector<std::shared_ptr<Package>> PackageProvider::getPackages(Package::Context ctx)
{
    return {};
}
