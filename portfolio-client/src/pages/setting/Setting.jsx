import React, { useState } from "react";
import { Container, TextField, Button, Avatar, Grid, Box, IconButton, InputAdornment } from "@mui/material";
import { PhotoCamera, Visibility, VisibilityOff } from "@mui/icons-material";
import SettingStyle from "./Setting.module.css";

const Setting = () => {
  const [avatarImage, setAvatarImage] = useState("/mnt/data/image.png");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [newPasswordError, setNewPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      setAvatarImage(e.target.result);
    };
    reader.readAsDataURL(file);
  };

  const togglePasswordVisibility = (field) => {
    switch (field) {
      case 'current':
        setShowCurrentPassword(!showCurrentPassword);
        break;
      case 'new':
        setShowNewPassword(!showNewPassword);
        break;
      case 'confirm':
        setShowConfirmPassword(!showConfirmPassword);
        break;
      default:
        break;
    }
  };

  const handleSave = () => {
    let valid = true;

    if (newPassword === "" || newPassword === currentPassword || newPassword !== confirmPassword) {
      valid = false;
      setNewPasswordError(true);
      setConfirmPasswordError(true);
    } else {
      setNewPasswordError(false);
      setConfirmPasswordError(false);
    }

    if (valid) {
      // Your save logic here, e.g., API call or state update
    }
  };

  return (
    <Container maxWidth="lg" className={SettingStyle["setting-container"]}>
      <Box display="flex" alignItems="center" justifyContent="space-between" mb={3}>
        <Box className={SettingStyle["h3"]}>
          <h3>Monkey D. Luffy</h3>
        </Box>
        <Box display="flex" alignItems="center">
          <Button variant="outlined" color="primary" sx={{
            mr: 2,
            p: 3
          }}>
            キャンセル
          </Button>
          <Button variant="contained" color="primary" onClick={handleSave}
          sx={{
            mr: 2,
            p: 3
          }}> 
            保存
          </Button>
        </Box>
      </Box>
      <Box mt={3} maxWidth="100%" mb={8}>
        <Box display="flex" alignItems="center">
          <Box display="flex" alignItems="center" position="relative" mr={2}>
            <Avatar alt="Jerome Bell" src={
          "https://randomuser.me/api/portraits/med/men/" +
          parseInt(Math.random() * 100) +
          ".jpg"
        } sx={{ width: 150, height: 150 }} />
            <label htmlFor="avatar-upload">
              <IconButton color="primary" aria-label="upload picture" component="span" size="small" sx={{ position: 'absolute', bottom: 4, right: 4, backgroundColor: 'white' }}>
                <PhotoCamera />
              </IconButton>
            </label>
            <input accept="image/*" id="avatar-upload" type="file" style={{ display: 'none' }} onChange={handleAvatarChange} />
          </Box>
          <Grid container spacing={2} >
            <Grid item xs={12} md={3} sx={{ lineHeight: 2, m: 1 }}>
              <TextField label="名" variant="outlined" fullWidth defaultValue="Jerome Bell" />
            </Grid>
            <Grid item xs={12} md={3} sx={{ lineHeight: 2, m: 1 }}>
              <TextField label="姓" variant="outlined" fullWidth defaultValue="Jerome Bell" />
            </Grid>
            <Grid item xs={12} md={3} sx={{ lineHeight: 2, m: 1 }}>
              <TextField label="電話番号" variant="outlined" fullWidth defaultValue="998 93 456 67 85" />
            </Grid>
            <Grid item xs={12} md={3} sx={{ lineHeight: 2, m: 1 }}>
              <TextField label="メール" variant="outlined" fullWidth defaultValue="jerome_bell@gmail.com" />
            </Grid>
          </Grid>
        </Box>
      </Box>





      <Box className={SettingStyle["section"]}>
        <h4 className={SettingStyle["h4"]}>パスワード</h4>
        <Grid container spacing={3} ml={5}>
          <Grid item xs={12} sm={4}>
            <TextField
              label="現在のパスワード"
              variant="outlined"
              fullWidth
              type={showCurrentPassword ? "text" : "password"}
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => togglePasswordVisibility('current')}>
                      {showCurrentPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="新規パスワード"
              variant="outlined"
              fullWidth
              type={showNewPassword ? "text" : "password"}
              value={newPassword}
              error={newPasswordError}
              helperText={newPasswordError ? "パスワードが一致しません。" : ""}
              onChange={(e) => setNewPassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => togglePasswordVisibility('new')}>
                      {showNewPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="パスワードを認証"
              variant="outlined"
              fullWidth
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              error={confirmPasswordError}
              helperText={confirmPasswordError ? "パスワードが一致しません。" : ""}
              onChange={(e) => setConfirmPassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => togglePasswordVisibility('confirm')}>
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
        </Grid>
      </Box>
      <Box className={SettingStyle["section"]} mt={10}>
        <h4 className={SettingStyle["h4"]}>JDU問い合わせ</h4>
        <Grid container spacing={2} ml={5}>
          <Grid item xs={12} sm={4} sx={{lineHeight: 1, m:1}}>
            <TextField label="メール" variant="outlined" fullWidth defaultValue="test@jdu.uz" />
          </Grid>
          <Grid item xs={12} sm={4} sx={{lineHeight: 1, m:1}}>
            <TextField label="電話番号" variant="outlined" fullWidth defaultValue="+998 90 234 56 78" />
          </Grid>
          <Grid item xs={12} sm={4} sx={{lineHeight: 1, m:1}}>
            <TextField label="勤務時間" variant="outlined" fullWidth defaultValue="09:00 - 18:00" />
          </Grid>
          <Grid item xs={12} sx={{lineHeight: 2, m:1}}>
            <TextField label="ロケーション" variant="outlined" fullWidth defaultValue="Tashkent, Shayhontohur district, Sebzor, 21" />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Setting;