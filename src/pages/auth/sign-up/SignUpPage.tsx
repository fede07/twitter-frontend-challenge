import React, { useState } from 'react';
import logo from '../../../assets/logo.png';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import AuthWrapper from '../../../pages/auth/AuthWrapper';
import { useHttpRequestService } from '../../../service/HttpRequestService';
import LabeledInput from '../../../components/labeled-input/LabeledInput';
import Button from '../../../components/button/Button';
import { ButtonType } from '../../../components/button/StyledButton';
import { StyledH3 } from '../../../components/common/text';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import {ToastType} from "../../../components/toast/Toast"
import {useToast} from "../../../context/ToastContext"

interface SignUpData {
  name: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}
const SignUpPage = () => {
  // const [data, setData] = useState<Partial<SignUpData>>({});
  // const [error, setError] = useState(false);
  const [errorConflict, setErrorConflict] = useState(false);
  const { showToast } = useToast();

  const httpRequestService = useHttpRequestService();
  const navigate = useNavigate();
  const { t } = useTranslation();

  // const handleChange =
  //   (prop: string) => (event: ChangeEvent<HTMLInputElement>) => {
  //     setData({ ...data, [prop]: event.target.value });
  //   };
  // const handleSubmit = async () => {
  //   const { confirmPassword, ...requestData } = data;
  //   const response = await httpRequestService.signUp(requestData);
  //
  //   if (response?.success) {
  //     navigate('/');
  //   } else {
  //     setError(true);
  //     if (response?.status === 409) {
  //       setErrorConflict(true);
  //       console.log(response?.status);
  //     }
  //   }
  // };

  const validationSchema = Yup.object({
    name: Yup.string()
      .required('Name is required')
      .min(4, 'Name must be at least 4 characters'),
    username: Yup.string()
      .required('Username is required')
      .min(4, 'Username must be at least 4 characters'),
    email: Yup.string().required('Email is required').email('Email is invalid'),
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters'),
    confirmPassword: Yup.string()
      .required('Confirm password is required')
      .oneOf([Yup.ref('password'), ''], 'Passwords must match'),
  });

  const formik = useFormik<SignUpData>({
    initialValues: {
      name: '',
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const { confirmPassword, ...requestData } = values;
      try {
        const response = await httpRequestService.signUp(requestData);
        if (response?.success) {
          navigate('/');
        } else {
          if (response?.status === 409) {
            setErrorConflict(true);
          }
        }
      } catch (e) {
        if (e instanceof Error) {
          showToast(e.message, ToastType.ALERT);
        } else {
          showToast('An unknown error occurred', ToastType.ALERT);
        }
      }
    },
  });

  return (
    <AuthWrapper>
      <div className={'border'}>
        <form onSubmit={formik.handleSubmit}>
          <div className={'container'}>
            <div className={'header'}>
              <img src={logo} alt="Twitter Logo" />
              <StyledH3>{t('title.register')}</StyledH3>
            </div>

            <div className={'input-container'}>
              <LabeledInput
                id={'name'}
                required
                placeholder={'Enter name...'}
                title={t('input-params.name')}
                error={!!formik.errors.name && !!formik.touched.name}
                errorText={formik.errors.name}
                {...formik.getFieldProps('name')}
              />
              <LabeledInput
                id={'username'}
                required
                placeholder={'Enter username...'}
                title={t('input-params.username')}
                error={!!formik.errors.username && !!formik.touched.username}
                errorText={formik.errors.username}
                {...formik.getFieldProps('username')}
              />
              <LabeledInput
                id={'email'}
                required
                placeholder={'Enter email...'}
                title={t('input-params.email')}
                error={!!formik.errors.email && !!formik.touched.email}
                errorText={formik.errors.email}
                {...formik.getFieldProps('email')}
              />
              <LabeledInput
                id={'password'}
                type="password"
                required
                placeholder={'Enter password...'}
                title={t('input-params.password')}
                error={!!formik.errors.password && !!formik.touched.password}
                errorText={formik.errors.password}
                {...formik.getFieldProps('password')}
              />
              <LabeledInput
                id={'confirmPassword'}
                type="password"
                required
                placeholder={'Confirm password...'}
                title={t('input-params.confirm-password')}
                error={
                  !!formik.errors.confirmPassword &&
                  !!formik.touched.confirmPassword
                }
                errorText={formik.errors.confirmPassword}
                {...formik.getFieldProps('confirmPassword')}
              />
            </div>
            {errorConflict ? (
              <div>
                <p className={'error'}>User already exists</p>
              </div>
            ) : (
              <></>
            )}

            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <Button
                type={'submit'}
                text={t('buttons.register')}
                buttonType={ButtonType.FOLLOW}
                size={'MEDIUM'}
              />
              <Button
                text={t('buttons.login')}
                buttonType={ButtonType.OUTLINED}
                size={'MEDIUM'}
                onClick={() => navigate('/sign-in')}
              />
            </div>
          </div>
        </form>
      </div>
    </AuthWrapper>
  );
};

export default SignUpPage;
