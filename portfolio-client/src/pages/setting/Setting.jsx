import React, { useState } from "react";
import axios from "../../utils/axiosUtils";
import {
  Container,
  TextField,
  Button,
  Avatar,
  Grid,
  Box,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { PhotoCamera, Visibility, VisibilityOff } from "@mui/icons-material";
import { useForm, Controller } from "react-hook-form";
import jduLogo from "../../assets/logo.png";
import SettingStyle from "./Setting.module.css";

const Setting = () => {
  const [avatarImage, setAvatarImage] = useState(jduLogo);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
      firstName: "Default Admin",
      lastName: "Default Admin",
      phoneNumber: "998 93 456 67 85",
      email: "admin@gmail.com",
      contactEmail: "test@jdu.uz",
      contactPhone: "+998 90 234 56 78",
      workingHours: "09:00 - 18:00",
      location: "Tashkent, Shayhontohur district, Sebzor, 21",
    },
  });

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
      case "current":
        setShowCurrentPassword(!showCurrentPassword);
        break;
      case "new":
        setShowNewPassword(!showNewPassword);
        break;
      case "confirm":
        setShowConfirmPassword(!showConfirmPassword);
        break;
      default:
        break;
    }
  };

  const validatePasswords = (data) => {
    if (data.newPassword !== data.confirmPassword) {
      return "Passwords do not match";
    }
    if (data.newPassword === data.currentPassword) {
      return "New password must be different from the current password";
    }
    return true;
  };

  const onSubmit = (data) => {
    const passwordValidation = validatePasswords(data);
    if (passwordValidation === true) {
      alert("Password updated successfully");
    } else {
      alert(passwordValidation);
    }
  };

  const handleSync = async () => {
    try {
      await axios.post("api/kintone/sync");
      alert("Sync successful");
    } catch (error) {
      console.error("Sync failed:", error);
      alert("Sync failed. Please try again.");
    }
  };

  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        className={SettingStyle["header"]}
      >
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          className={SettingStyle["header"]}
        >
          <Box display="flex" alignItems="center" position="relative" mr={2}>
            <Avatar
              alt="User Avatar"
              src={avatarImage}
              sx={{ width: 100, height: 100 }}
            />
            <label htmlFor="avatar-upload">
              <IconButton
                color="primary"
                aria-label="upload picture"
                component="span"
                size="small"
                sx={{
                  position: "absolute",
                  bottom: 4,
                  right: 4,
                  backgroundColor: "white",
                }}
              >
                <PhotoCamera />
              </IconButton>
            </label>
            <input
              accept="image/*"
              id="avatar-upload"
              type="file"
              style={{ display: "none" }}
              onChange={handleAvatarChange}
            />
          </Box>

          <Box ml={2}>
            <h1 className={SettingStyle["h1"]}>Monkey D. Luffy</h1>
          </Box>
        </Box>
        <Box
          display="flex"
          alignItems="center"
          className={SettingStyle["button-group"]}
        >
          <Button
            variant="outlined"
            color="primary"
            className={SettingStyle["cancel-button"]}
            style={{ minWidth: "124px" }}
          >
            キャンセル
          </Button>
          <Button
            variant="contained"
            color="primary"
            className={SettingStyle["save-button"]}
            onClick={handleSubmit(onSubmit)}
            style={{ minWidth: "76px" }}
          >
            保存
          </Button>
        </Box>
      </Box>
      <Box my={1} className={SettingStyle.syncButton}>
        <Button variant="contained" color="primary" onClick={handleSync}>
          同期
        </Button>
      </Box>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={6}>
          <Controller
            name="firstName"
            control={control}
            render={({ field }) => (
              <TextField label="名" variant="outlined" fullWidth {...field} />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            name="lastName"
            control={control}
            render={({ field }) => (
              <TextField label="姓" variant="outlined" fullWidth {...field} />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            name="phoneNumber"
            control={control}
            render={({ field }) => (
              <TextField
                label="電話番号"
                variant="outlined"
                fullWidth
                {...field}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextField
                label="メール"
                variant="outlined"
                fullWidth
                {...field}
              />
            )}
          />
        </Grid>
      </Grid>
      <Box className={SettingStyle["section"]}>
        <h2 className={SettingStyle["h2"]}>パスワード</h2>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <Controller
              name="currentPassword"
              control={control}
              render={({ field }) => (
                <TextField
                  label="現在のパスワード"
                  variant="outlined"
                  fullWidth
                  type={showCurrentPassword ? "text" : "password"}
                  {...field}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => togglePasswordVisibility("current")}
                        >
                          {showCurrentPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Controller
              name="newPassword"
              control={control}
              render={({ field }) => (
                <TextField
                  label="新規パスワード"
                  variant="outlined"
                  fullWidth
                  type={showNewPassword ? "text" : "password"}
                  {...field}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => togglePasswordVisibility("new")}
                        >
                          {showNewPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Controller
              name="confirmPassword"
              control={control}
              render={({ field }) => (
                <TextField
                  label="パスワードを認証"
                  variant="outlined"
                  fullWidth
                  type={showConfirmPassword ? "text" : "password"}
                  {...field}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => togglePasswordVisibility("confirm")}
                        >
                          {showConfirmPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />
          </Grid>
        </Grid>
      </Box>
      <Box className={SettingStyle["section"]}>
        <h2 className={SettingStyle["h2"]}>JDU問い合わせ</h2>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <Controller
              name="contactEmail"
              control={control}
              render={({ field }) => (
                <TextField
                  label="メール"
                  variant="outlined"
                  fullWidth
                  {...field}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Controller
              name="contactPhone"
              control={control}
              render={({ field }) => (
                <TextField
                  label="電話番号"
                  variant="outlined"
                  fullWidth
                  {...field}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Controller
              name="workingHours"
              control={control}
              render={({ field }) => (
                <TextField
                  label="勤務時間"
                  variant="outlined"
                  fullWidth
                  {...field}
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="location"
              control={control}
              render={({ field }) => (
                <TextField
                  label="ロケーション"
                  variant="outlined"
                  fullWidth
                  {...field}
                />
              )}
            />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Setting;
