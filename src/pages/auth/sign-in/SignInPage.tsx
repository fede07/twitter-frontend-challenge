import React, { useState } from 'react';
import logo from '../../../assets/logo.png';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useHttpRequestService } from '../../../service/HttpRequestService';
import AuthWrapper from '../AuthWrapper';
import LabeledInput from '../../../components/labeled-input/LabeledInput';
import Button from '../../../components/button/Button';
import { ButtonType } from '../../../components/button/StyledButton';
import { StyledH3 } from '../../../components/common/text';
import { useQueryClient } from '@tanstack/react-query';
import { useToast } from '../../../context/ToastContext';
import { ToastType } from '../../../components/toast/Toast';
import * as Yup from 'yup';
import { useFormik } from 'formik';

interface SignInData {
  email: string;
  password: string;
}

const SignInPage = () => {
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const httpRequestService = useHttpRequestService();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { showToast } = useToast()

  const queryClient = useQueryClient();

  // const handleSubmit = () => {
  //   queryClient.clear();
  //   httpRequestService
  //     .signIn({ email, password })
  //     .then(() => navigate('/'))
  //     .catch(() => setError(true));
  //   showToast('Logged in', ToastType.SUCCESS);
  // };

  const validationSchema = Yup.object({
    email: Yup.string().required('Email is required').email('Email is invalid'),
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters'),
  });

  const formik = useFormik<SignInData>({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values: SignInData) => {
      const { ...requestData } = values;
      queryClient.clear();
      try {
        const response = await httpRequestService.signIn(requestData);
        if (response) {
          showToast('Logged in', ToastType.SUCCESS);
          navigate('/');
        } else {
          setError(true);
        }
      } catch (e) {
        if (e instanceof Error) {
          setError(true);
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
              <img src={logo} alt={'Twitter Logo'} />
              <StyledH3>{t('title.login')}</StyledH3>
            </div>
            <div className={'input-container'}>
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
              <p className={'error-message'}>{error && t('error.login')}</p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <Button
                type={'submit'}
                text={t('buttons.login')}
                buttonType={ButtonType.FOLLOW}
                size={'MEDIUM'}
              />
              <Button
                text={t('buttons.register')}
                buttonType={ButtonType.OUTLINED}
                size={'MEDIUM'}
                onClick={() => navigate('/sign-up')}
              />
            </div>
          </div>
        </form>
      </div>
    </AuthWrapper>
  );
};

export default SignInPage;
