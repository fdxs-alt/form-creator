import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  useDisclosure,
  Box,
  Text,
} from '@chakra-ui/react'
import { addNewInput, useForm } from '@store'
import { Input } from 'models/FormField'
import React from 'react'

const inputTypes: { fieldType: Input; description: string }[] = [
  { fieldType: 'text', description: 'Short text input' },
  { fieldType: 'checkbox', description: 'Many options select' },
  { fieldType: 'date', description: 'Date picker' },
  { fieldType: 'email', description: 'Email input' },
  { fieldType: 'number', description: 'Number picker' },
  { fieldType: 'radio', description: 'Select single option select' },
  { fieldType: 'textarea', description: 'Long text input' },
]

const InputsDrawer = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { dispatch } = useForm()

  return (
    <>
      <Button colorScheme="facebook" onClick={onOpen} size="lg">
        Click to add input
      </Button>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Add the input:</DrawerHeader>
            <DrawerBody>
              {inputTypes.map((type, i) => (
                <Box
                  key={i}
                  padding="10px 5px"
                  cursor="pointer"
                  onClick={() => {
                    dispatch(addNewInput(type.fieldType))
                    onClose()
                  }}
                >
                  <Text fontSize="20px" textTransform="capitalize">
                    {type.fieldType}
                  </Text>
                  <Text fontSize="14px" textTransform="capitalize">
                    {type.description}
                  </Text>
                </Box>
              ))}
            </DrawerBody>
            <DrawerFooter>
              <Button colorScheme="facebook" onClick={onClose} size="lg">
                Close
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  )
}

export default InputsDrawer
