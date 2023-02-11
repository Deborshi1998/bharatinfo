import React, { useRef } from "react";
import {
  Heading,
  Button,
  Spacer,
  Menu,
  Flex,
  MenuButton,
  MenuList,
  MenuItem,
  Hide,
  Show,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { ChevronDownIcon, HamburgerIcon } from "@chakra-ui/icons";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { fetchMenu } from "../store/menuSlice";
function NavbarComponent() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef(null);
  const dispatch = useDispatch();

  const HealthMenu = [
    { value: "CancerIncidence", label: "🧟 Cancer", collection: "Health" },
    {
      value: "SexRatio-Adult",
      label: "👫 Sex Ratio ",
      collection: "Health",
    },
    {
      value: "SexRatio-Birth",
      label: "👩‍🍼 Sex Ratio-at birth",
      collection: "Health",
    },
    {
      value: "InfantMortality",
      label: "☠️ Infant Mortality",
      collection: "Health",
    },
  ];

  const EconomicMenu = [
    {
      value: "UnemployementRate",
      label: "👨‍🔧 Unemployement",
      collection: "Economy",
    },
    { value: "NSDP_income", label: "💸 Income", collection: "Economy" },
  ];
  return (
    <>
      <Flex
        minWidth="max-content"
        alignItems="center"
        gap="2"
        px={5}
        py={2}
        bg="white"
        boxShadow="lg"
      >
        <Flex>
          <Image src="/india.png" alt="logo" width={64} height={64} />
          <Heading size="lg" py={3}>
            Bharat-Info
          </Heading>
        </Flex>
        <Spacer />
        <Show below="md">
          <Button ref={btnRef} colorScheme="teal" onClick={onOpen}>
            <HamburgerIcon />
          </Button>
          <Drawer
            isOpen={isOpen}
            placement="right"
            onClose={onClose}
            finalFocusRef={btnRef}
          >
            <DrawerOverlay />
            <DrawerContent>
              <DrawerCloseButton />
              <DrawerHeader>Menu</DrawerHeader>

              <DrawerBody>
                <Flex gap="2" direction="column" align="flex-start">
                  <Menu>
                    <MenuButton
                      border={"none"}
                      backgroundColor={"transparent"}
                      as={Button}
                      rightIcon={<ChevronDownIcon />}
                    >
                      🏥 Health
                    </MenuButton>
                    <MenuList>
                      {HealthMenu.map((item) => (
                        <MenuItem
                          onClick={() => {
                            dispatch(
                              fetchMenu({
                                collection: item.collection,
                                document: item.value,
                              })
                            );
                          }}
                        >
                          {item.label}
                        </MenuItem>
                      ))}
                    </MenuList>
                  </Menu>
                  <Menu>
                    <MenuButton
                      border={"none"}
                      backgroundColor={"transparent"}
                      as={Button}
                      rightIcon={<ChevronDownIcon />}
                    >
                      💵 Economic
                    </MenuButton>
                    <MenuList>
                      {EconomicMenu.map((item) => (
                        <MenuItem
                          onClick={() =>
                            dispatch(
                              fetchMenu({
                                collection: item.collection,
                                document: item.value,
                              })
                            )
                          }
                        >
                          {item.label}
                        </MenuItem>
                      ))}
                    </MenuList>
                  </Menu>
                </Flex>
              </DrawerBody>
            </DrawerContent>
          </Drawer>
        </Show>
        <Hide below="md">
          <Flex alignItems="center" gap="2" px={5}>
            <Menu>
              <MenuButton
                border={"none"}
                backgroundColor={"transparent"}
                as={Button}
                rightIcon={<ChevronDownIcon />}
              >
                🏥 Health
              </MenuButton>
              <MenuList>
                {HealthMenu.map((item) => (
                  <MenuItem
                    onClick={() => {
                      dispatch(
                        fetchMenu({
                          collection: item.collection,
                          document: item.value,
                        })
                      );
                    }}
                  >
                    {item.label}
                  </MenuItem>
                ))}
              </MenuList>
            </Menu>
            <Menu>
              <MenuButton
                border={"none"}
                backgroundColor={"transparent"}
                as={Button}
                rightIcon={<ChevronDownIcon />}
              >
                💵 Economic
              </MenuButton>
              <MenuList>
                {EconomicMenu.map((item) => (
                  <MenuItem
                    onClick={() =>
                      dispatch(
                        fetchMenu({
                          collection: item.collection,
                          document: item.value,
                        })
                      )
                    }
                  >
                    {item.label}
                  </MenuItem>
                ))}
              </MenuList>
            </Menu>
          </Flex>
        </Hide>
      </Flex>
    </>
  );
}

export default NavbarComponent;
