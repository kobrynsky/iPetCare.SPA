import React, { useState, useEffect } from 'react'
import { OWNER, VET } from '../../../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { registerUser } from '../../../state/user/userActions'
import '../auth.css'
import {
  FormControl,
  Radio,
  RadioGroup,
  FormLabel,
  FormControlLabel,
  Button,
  TextField,
  FormHelperText,
  Card,
  CircularProgress,
} from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import { RootState } from '../../../state/store'
import { useFormik, ErrorMessage } from 'formik'
import { object, string, number, date, ref } from 'yup'

export function RegisterForm() {
  const dispatch = useDispatch()
  const history = useHistory()
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      userName: '',
      email: '',
      password: '',
      passwordRepeated: '',
    },
    validationSchema: object({
      firstName: string()
        .required('Imię jest wymagane')
        .max(255),
      lastName: string()
        .required('Nazwisko jest wymagane')
        .max(255),
      userName: string().required('Nazwa użytkownika jest wymagana'),
      email: string()
        .required('Email jest wymagany')
        .email('Niepoprawny email'),
      password: string().required('Hasło jest wymagane'),
      // .matches(
      //   /^(?=.*[A-Za-z])(?=.*d)(?=.*[@$!%*#?&])[A-Za-zd@$!%*#?&]{8,}$/,
      //   'Minimum 8 znaków, przynajmniej jedna litera, jedna cyfra i jeden znak specialny'
      // ),
      passwordRepeated: string().oneOf(
        [ref('password'), null],
        'Hasła muszą być identyczne'
      ),
    }),
    onSubmit: values => {
      dispatch(registerUser({ ...values, role }))
    },
  })

  const [role, setRole] = useState('' as 'Owner' | 'Vet')
  const [error, setError] = useState('')
  const userState = useSelector((state: RootState) => state.user)

  useEffect(() => {
    if (userState.error) {
      setError(userState.error)
    }
  }, [userState.error, error])

  useEffect(() => {
    if (userState.user.token) history.push('/login')
  }, [userState.user.token])

  return (
    <Card className="formCard">
      <form onSubmit={formik.handleSubmit}>
        <div className="authForm">
          <h2>Rejestracja</h2>
          <TextField
            required
            margin="normal"
            // variant="outlined"
            name="firstName"
            label="Imię"
            value={formik.values.firstName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <FormHelperText
            style={{ color: 'red', paddingLeft: 10 }}
            error={!!formik.errors.firstName && formik.touched.firstName}
          >
            {formik.errors.firstName}
          </FormHelperText>
          <TextField
            required
            margin="normal"
            // variant="outlined"
            name="lastName"
            label="Nazwisko"
            value={formik.values.lastName}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          <FormHelperText
            style={{ color: 'red', paddingLeft: 10 }}
            error={!!formik.errors.lastName && formik.touched.lastName}
          >
            {formik.errors.lastName}
          </FormHelperText>
          <TextField
            required
            margin="normal"
            // variant="outlined"
            name="userName"
            label="Nazwa użytkownika"
            value={formik.values.userName}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          <FormHelperText
            style={{ color: 'red', paddingLeft: 10 }}
            error={!!formik.errors.userName && formik.touched.userName}
          >
            {formik.errors.userName}
          </FormHelperText>
          <TextField
            required
            margin="normal"
            // variant="outlined"
            name="email"
            label="Email"
            type="email"
            value={formik.values.email}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          <FormHelperText
            style={{ color: 'red', paddingLeft: 10 }}
            error={!!formik.errors.email && formik.touched.email}
          >
            {formik.errors.email}
          </FormHelperText>
          <TextField
            required
            margin="normal"
            // variant="outlined"
            label="Hasło"
            name="password"
            type="password"
            value={formik.values.password}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />

          <FormHelperText
            style={{ color: 'red', paddingLeft: 10 }}
            error={!!formik.errors.password && formik.touched.password}
          >
            {formik.errors.password}
          </FormHelperText>
          <TextField
            required
            margin="normal"
            // variant="outlined"
            label="Powtórz hasło"
            name="passwordRepeated"
            type="password"
            value={formik.values.passwordRepeated}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          <FormHelperText
            style={{ color: 'red', paddingLeft: 10 }}
            error={
              !!formik.errors.passwordRepeated &&
              formik.touched.passwordRepeated
            }
          >
            {formik.errors.passwordRepeated}
          </FormHelperText>
          <FormControl required margin="normal">
            <FormLabel>Rola</FormLabel>
            <RadioGroup row>
              <FormControlLabel
                label="Opiekun"
                value={OWNER}
                control={
                  <Radio
                    color="primary"
                    checked={role === OWNER}
                    onChange={e => {
                      setRole(e.target.value as 'Owner' | 'Vet')
                    }}
                  />
                }
              />
              <FormControlLabel
                label="Weterynarz"
                value={VET}
                control={
                  <Radio
                    color="primary"
                    checked={role === VET}
                    onChange={e => {
                      setRole(e.target.value as 'Owner' | 'Vet')
                    }}
                  />
                }
              />
            </RadioGroup>
          </FormControl>
          <FormHelperText error={!!error}>{error}</FormHelperText>
          {userState.loading ? (
            <CircularProgress style={{ alignSelf: 'center' }} />
          ) : (
            <Button type="submit">Zarejestruj</Button>
          )}
        </div>
      </form>
    </Card>
  )
}
