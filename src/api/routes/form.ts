/* eslint-disable @typescript-eslint/no-unused-vars */
import OptionModel from 'models/Option'
import FormField from 'models/FormField'
import Form from 'models/Form'
import { IFormField } from '@store'
import { NextApiRequest, NextApiResponse } from 'next'
import { NextHandler } from 'next-connect'
import { getSession, Session } from '@auth0/nextjs-auth0'
import { ErrorWithHttpCode } from 'api/middleware/error'

const createForm = async (
  req: NextApiRequest,
  res: NextApiResponse,
  _next: NextHandler
) => {
  const {
    formFields,
    title,
    description,
    completeTitle,
    completeDescription,
    dateOfExpire,
  } = req.body

  const user = getSession(req, res) as Session

  if (!user) {
    throw new ErrorWithHttpCode('User unauthorized', 401)
  }

  const fields = (formFields as IFormField[]).map((el) => {
    const { options, required, id, ...rest } = el

    const newField = new FormField({
      ...rest,
      name: rest.label,
      require: required,
      id,
    })

    if (options) {
      const insertedOptions = options.map((option) => {
        return new OptionModel({ value: option })
      })

      newField.options = insertedOptions
    }

    return newField
  })

  const newForm = await new Form({
    title,
    description,
    completeTitle,
    completeDescription,
    dateOfExpire,
    fields,
    userEmail: user.user.email,
  }).save()

  res.json({ newForm })
}

export { createForm }