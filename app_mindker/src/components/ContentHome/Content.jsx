import { Flex, Text, useColorModeValue, Box } from '@chakra-ui/react';
import ImageComponent from '../ImageComponents/Image';
import { useMediaQuery } from '@chakra-ui/react';

const Content = () => {
  const bg = useColorModeValue('');
  const color = useColorModeValue('');
  const [isLargerThan700] = useMediaQuery('(min-width: 700px)');

  return isLargerThan700 ? (
    <Flex id="sectionContentHome" w="100vw" py="1rem">
      <Flex
        direction="row"
        color={color}
        align="center"
        flexWrap="wrap"
        justifyContent="center"
        w="100vw"
        gap="3rem"
        px="10%"
      >
        <Flex direction="column" w="40rem">
          <Flex w="100%" direction="row" display="flex" alignItems="center" gap="3rem">
            <Box>
              <Text fontSize="40px" textAlign="left" as="b">
                What is Mindker?
              </Text>
            </Box>
            <ImageComponent
              boxSize="4rem"
              src="https://res.cloudinary.com/drprserzu/image/upload/v1671444020/study-process-svgrepo-com_zfgds8.svg"
            />
          </Flex>
          <Flex direction="column" bg={bg} color={color} align="left">
            <Text fontSize="16px" width="100%" textAlign="left">
              Mindker is a collaborative learning application that generates a community
              of users immersed in learning processes.
            </Text>
            <Text fontSize="16px" width="100%" textAlign="left">
              Create your own studying material and share it with others! Mindker works on
              the forgetting curve.
            </Text>
            <Flex direction="row" justifyContent="space-between" mt="1rem" gap="1rem">
              <Flex direction="column" alignItems="center">
                <Text color="#5f1590" as="b" fontSize="5xl">
                  98%
                </Text>
                <Text>recommend it</Text>
              </Flex>
              <Flex direction="column" alignItems="center">
                <Text color="#5f1590" as="b" fontSize="5xl">
                  +200
                </Text>
                <Text>countries</Text>
              </Flex>
              <Flex direction="column" alignItems="center">
                <Text color="#5f1590" as="b" fontSize="5xl">
                  358
                </Text>
                <Text>universities</Text>
              </Flex>
            </Flex>
            <Flex
              direction="row"
              h="5rem"
              mt="1.5rem"
              gap="1rem"
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <ImageComponent
                boxSize="4rem"
                src="https://res.cloudinary.com/drprserzu/image/upload/v1671444096/university-svgrepo-com_nia2cv.svg"
              />
              <Flex>
                <ImageComponent
                  objectFit="contain"
                  src="https://res.cloudinary.com/drprserzu/image/upload/v1671443142/partners_sqpcrr.png"
                />
              </Flex>
            </Flex>
          </Flex>
        </Flex>
        <Flex w="30rem" alignItems="center" justifyContent="center">
          <ImageComponent
            boxSize="25rem"
            w="20rem"
            src="https://res.cloudinary.com/drprserzu/image/upload/v1671438578/forgettingcurve_m0gukg.png"
            borderRadius="20px"
          ></ImageComponent>
        </Flex>
      </Flex>
    </Flex>
  ) : (
    <Flex id="sectionContentHome" w="100vw" py="1rem">
      <Flex
        direction="row"
        color={color}
        align="center"
        flexWrap="wrap"
        justifyContent="space-around"
        w="100vw"
        gap="3rem"
      >
        <Flex direction="column" px="2rem">
          <Flex w="100%" direction="row" display="flex" alignItems="center" gap="3rem">
            <Box>
              <Text fontSize="40px" textAlign="left" as="b">
                What is Mindker?
              </Text>
            </Box>
            <ImageComponent
              boxSize="4rem"
              src="https://res.cloudinary.com/drprserzu/image/upload/v1671444020/study-process-svgrepo-com_zfgds8.svg"
            />
          </Flex>
          <Flex direction="column" bg={bg} color={color} align="left">
            <Text fontSize="16px" width="100%" textAlign="left">
              Mindker is a collaborative learning application that generates a community
              of users immersed in learning processes.
            </Text>
            <Text fontSize="16px" width="100%" textAlign="left">
              Create your own studying material and share it with others! Mindker works on
              the forgetting curve.
            </Text>
            <Flex direction="row" justifyContent="space-between" mt="1rem" gap="1rem">
              <Flex direction="column" alignItems="center">
                <Text color="#5f1590" as="b" fontSize="5xl">
                  98%
                </Text>
                <Text>recommend it</Text>
              </Flex>
              <Flex direction="column" alignItems="center">
                <Text color="#5f1590" as="b" fontSize="5xl">
                  +200
                </Text>
                <Text>countries</Text>
              </Flex>
              <Flex direction="column" alignItems="center">
                <Text color="#5f1590" as="b" fontSize="5xl">
                  358
                </Text>
                <Text>universities</Text>
              </Flex>
            </Flex>
            <Flex
              direction="column"
              h="5rem"
              my="1.5rem"
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <ImageComponent
                objectFit="contain"
                src="https://res.cloudinary.com/drprserzu/image/upload/v1671443142/partners_sqpcrr.png"
              />
            </Flex>
          </Flex>
        </Flex>
        <Flex w="30rem" alignItems="center" justifyContent="center">
          <ImageComponent
            boxSize="20rem"
            w="20rem"
            src="https://res.cloudinary.com/drprserzu/image/upload/v1671438578/forgettingcurve_m0gukg.png"
            borderRadius="20px"
          ></ImageComponent>
        </Flex>
      </Flex>
    </Flex>
  );
};
export default Content;
