import EditIcon from '@mui/icons-material/Edit'
import { LoadingButton } from '@mui/lab'
import {
  Avatar,
  Box,
  Button,
  IconButton,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { Controller } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import PageHeader from '@/components/PageHeader'
import useResponsive from '@/hooks/useResponsive'

import useProfile from '../hooks/useProfile'

const Profile = () => {
  const { mobile } = useResponsive()
  const navigate = useNavigate()
  const {
    previewImage,
    control,
    errors,
    handleSubmit,
    onSubmit,
    handleImageChange,
  } = useProfile()

  return (
    <div>
      <PageHeader pageTitle="プロフィール" />
      <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 6 }}>
        <Typography fontWeight={'bold'}>プロフィール画像</Typography>
        <Box sx={{ position: 'relative', display: 'inline-block', mt: 2 }}>
          <Avatar
            alt="プロフィール編集"
            src={previewImage}
            sx={{
              width: mobile ? '100px' : '180px',
              height: mobile ? '100px' : '180px',
              zIndex: 1,
              backgroundColor: '#97BDC5',
            }}
          />
          <Controller
            name="image"
            control={control}
            render={({ field }) => (
              <Box>
                <input
                  accept="image/*"
                  style={{ display: 'none' }}
                  id="raised-button-file"
                  type="file"
                  onChange={(e) => {
                    handleImageChange(e)
                    field.onChange(e.target.files)
                  }}
                />
                <label htmlFor="raised-button-file">
                  <IconButton
                    component="span"
                    sx={{
                      position: 'absolute',
                      bottom: 0,
                      right: 0,
                      width: mobile ? '35px' : '50px',
                      height: mobile ? '35px' : '50px',
                      borderRadius: '50%',
                      boxShadow: 1,
                      bgcolor: 'primary.main',
                      zIndex: 10,
                      '&:hover': {
                        backgroundColor: '#97BDC5',
                      },
                    }}
                  >
                    <EditIcon sx={{ color: '#fff' }} />
                  </IconButton>
                </label>
              </Box>
            )}
          />
        </Box>

        <Controller
          name="name"
          control={control}
          rules={{ required: '表示名は必須です' }}
          render={({ field }) => (
            <TextField
              {...field}
              label="表示名"
              variant="outlined"
              fullWidth
              margin="normal"
              error={!!errors.name}
              helperText={errors.name?.message}
            />
          )}
        />
        <Controller
          name="email"
          control={control}
          rules={{ required: 'メールアドレスは必須です' }}
          render={({ field }) => (
            <TextField
              {...field}
              label="メールアドレス"
              variant="outlined"
              fullWidth
              margin="normal"
              error={!!errors.email}
              helperText={errors.email?.message}
            />
          )}
        />
        <Stack
          sx={{
            mt: 4,
            width: '100%',
            gap: 1,
            marginLeft: 'auto',
            pb: 10,
          }}
        >
          <LoadingButton
            type="submit"
            variant="contained"
            color="secondary"
            // loading={loading}
          >
            保存
          </LoadingButton>
          <Button
            onClick={() => navigate(-1)}
            variant="outlined"
            color="inherit"
          >
            戻る
          </Button>
        </Stack>
      </Box>
    </div>
  )
}

export default Profile