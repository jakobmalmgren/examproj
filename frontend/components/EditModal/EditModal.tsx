import { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import { updateApplication } from "../../apis/updateApplication";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import dayjs, { Dayjs } from "dayjs";
import { getUploadUrl } from "../../apis/getUploadUrl";
import Snackbar from "@mui/material/Snackbar";
import CloseIcon from "@mui/icons-material/Close";

import {
  Box,
  TextField,
  InputAdornment,
  IconButton,
  Typography,
  FormControlLabel,
  Tooltip,
  Switch,
  MenuItem,
  Button,
  Paper,
  Chip,
  Checkbox,
  CircularProgress,
  Autocomplete,
} from "@mui/material";
import Alert from "@mui/material/Alert";
import { useDropzone } from "react-dropzone";
import TitleIcon from "@mui/icons-material/Title";
import InfoIcon from "@mui/icons-material/Info";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import LocationOnIcon from "@mui/icons-material/LocationOn";

const GEOAPIFY_API_KEY = import.meta.env.VITE_GEOAPIFY_API_KEY;

type UploadFile = {
  name: string;
  url: string;
  key: string;
  contentType: string;
};

type LocationOption = {
  label: string;
  city: string;
  latitude: number;
  longitude: number;
};

type EditModalProps = {
  open: boolean;
  onClose: () => void;
  id: string;
  data: any;
};

const initialForm = {
  title: "",
  extraInfo: [""],
  applicationDate: "",
  priority: 1,
  reminder: false,
  reminderDate: "",
  files: [] as UploadFile[],
  location: {
    city: "",
    latitude: null as number | null,
    longitude: null as number | null,
  },
  category: "",
};

const EditModal = ({
  open,
  onClose,
  id,
  data,
  setRefreshKey,
}: EditModalProps) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [existingFiles, setExistingFiles] = useState<UploadFile[]>([]);
  const [removedFileKeys, setRemovedFileKeys] = useState<string[]>([]);
  const [form, setForm] = useState(initialForm);
  const [selectedLocation, setSelectedLocation] =
    useState<LocationOption | null>(null);
  const [locationResetKey, setLocationResetKey] = useState(0);
  const [locationQuery, setLocationQuery] = useState("");
  const [locationOptions, setLocationOptions] = useState<LocationOption[]>([]);
  const [loadingLocations, setLoadingLocations] = useState(false);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error" | "warning" | "info",
  });

  const uploadFileToS3 = async (file: File) => {
    const { uploadUrl, fileUrl, fileKey } = await getUploadUrl({
      fileName: file.name,
      fileType: file.type,
    });

    const uploadResponse = await fetch(uploadUrl, {
      method: "PUT",
      headers: {
        "Content-Type": file.type,
      },
      body: file,
    });

    if (!uploadResponse.ok) {
      throw new Error(`Failed to upload file: ${file.name}`);
    }

    return {
      name: file.name,
      url: fileUrl,
      key: fileKey,
      contentType: file.type,
    };
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value, type } = e.target as HTMLInputElement;
    const finalValue =
      type === "checkbox" ? (e.target as HTMLInputElement).checked : value;

    if (name.includes(".")) {
      const [parent, child] = name.split(".");

      setForm((prev) => ({
        ...prev,
        [parent]: {
          ...(prev[parent as keyof typeof prev] as object),
          [child]: finalValue,
        },
      }));
      return;
    }

    setForm((prev) => ({
      ...prev,
      [name]: finalValue,
    }));
  };

  const handlePriorityChange = (value: number) => {
    setForm((prev) => ({
      ...prev,
      priority: value,
    }));
  };

  const addExtraField = () => {
    setForm((prev) => ({
      ...prev,
      extraInfo: [...prev.extraInfo, ""],
    }));
  };

  const removeExtraField = (index: number) => {
    setForm((prev) => {
      const updated = prev.extraInfo.filter((_, i) => i !== index);
      return {
        ...prev,
        extraInfo: updated.length > 0 ? updated : [""],
      };
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  const handleExtraChange = (index: number, value: string) => {
    setForm((prev) => {
      const updatedExtraInfo = [...prev.extraInfo];
      updatedExtraInfo[index] = value;

      return {
        ...prev,
        extraInfo: updatedExtraInfo,
      };
    });
  };

  const handleReminderDateChange = (newValue: Dayjs | null) => {
    setForm((prev) => ({
      ...prev,
      reminderDate: newValue ? newValue.format("YYYY-MM-DD") : "",
    }));
  };

  const onDrop = (acceptedFiles: File[]) => {
    setSelectedFiles((prev) => [...prev, ...acceptedFiles]);
  };

  const handleRemoveExistingFile = (fileKey: string) => {
    setExistingFiles((prev) => prev.filter((file) => file.key !== fileKey));
    setRemovedFileKeys((prev) => [...prev, fileKey]);
  };

  const handleRemoveNewFile = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  useEffect(() => {
    if (!open || !data) return;

    setForm({
      title: data.title || "",
      extraInfo: data.extraInfo?.length ? data.extraInfo : [""],
      applicationDate: data.applicationDate || "",
      priority: data.priority || 1,
      reminder: data.reminder || false,
      reminderDate: data.reminderDate || "",
      files: data.files || [],
      location: data.location || {
        city: "",
        latitude: null,
        longitude: null,
      },
      category: data.category || "",
    });

    setExistingFiles(data.files || []);
    setRemovedFileKeys([]);
    setSelectedFiles([]);

    if (data.location?.city) {
      setLocationQuery(data.location.city);
      setSelectedLocation({
        label: data.location.city,
        city: data.location.city,
        latitude: data.location.latitude,
        longitude: data.location.longitude,
      });
    } else {
      setLocationQuery("");
      setSelectedLocation(null);
      setLocationResetKey((prev) => prev + 1);
    }
  }, [open, data]);

  useEffect(() => {
    const controller = new AbortController();

    const fetchLocations = async () => {
      if (!locationQuery.trim() || locationQuery.trim().length < 2) {
        setLocationOptions([]);
        return;
      }

      try {
        setLoadingLocations(true);

        const response = await fetch(
          `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(
            locationQuery,
          )}&type=city&lang=sv&limit=5&apiKey=${GEOAPIFY_API_KEY}`,
          { signal: controller.signal },
        );

        const result = await response.json();

        const options: LocationOption[] =
          result?.features?.map((feature: any) => ({
            label: feature.properties.formatted,
            city:
              feature.properties.city ||
              feature.properties.name ||
              feature.properties.formatted,
            latitude: feature.properties.lat,
            longitude: feature.properties.lon,
          })) || [];

        setLocationOptions(options);
      } catch (error: any) {
        if (error.name !== "AbortError") {
          console.log("Location autocomplete error:", error);
        }
      } finally {
        setLoadingLocations(false);
      }
    };

    const timeout = setTimeout(fetchLocations, 300);

    return () => {
      clearTimeout(timeout);
      controller.abort();
    };
  }, [locationQuery]);

  const handleSubmit = async () => {
    if (form.reminder && !form.reminderDate) {
      setSnackbar({
        open: true,
        message: "Please select a reminder date",
        severity: "error",
      });
      return;
    }

    try {
      const uploadedFiles = await Promise.all(
        selectedFiles.map((file) => uploadFileToS3(file)),
      );

      const cleanedForm = {
        ...form,
        title: form.title.trim(),
        category: form.category.trim(),
        extraInfo: form.extraInfo.filter((item) => item.trim() !== ""),
        reminderDate: form.reminder ? form.reminderDate : null,
        applicationDate: form.applicationDate || null,
        files: [...existingFiles, ...uploadedFiles],
        removedFileKeys,
      };

      const res = await updateApplication(id, cleanedForm);

      if (!res.success) {
        if (res.status === 400 || res.status === 404) {
          setSnackbar({
            open: true,
            message: res.message || "Failed to update application",
            severity: "error",
          });
        }
        return;
      }

      setSnackbar({
        open: true,
        message: res.message || "Application updated successfully",
        severity: "success",
      });

      // onClose();
      setTimeout(() => {
        setRefreshKey((prev) => prev + 1);
        onClose();
      }, 1200);
    } catch (err) {
      console.log("Network error while updating application:", err);
    }
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
        <DialogTitle
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            pr: 1,
          }}
        >
          <IconButton
            onClick={onClose}
            size="small"
            sx={{
              position: "absolute",
              top: 16,
              right: 16,
              color: "primary.main",
              bgcolor: "white",
              "&:hover": { bgcolor: "#f0f0f0" },
              zIndex: 1600,
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 3,
              p: 2,
              width: "100%",
              mt: 4,
            }}
          >
            <TextField
              label="Application Title"
              name="title"
              variant="outlined"
              value={form.title}
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <TitleIcon sx={{ color: "primary.main" }} />
                  </InputAdornment>
                ),
              }}
              sx={{ width: "100%" }}
            />

            {form.extraInfo.map((val, idx) => (
              <Box
                key={idx}
                sx={{ position: "relative", width: "100%", mb: 1 }}
              >
                <TextField
                  fullWidth
                  label="Extra info"
                  variant="outlined"
                  value={val}
                  onChange={(e) => handleExtraChange(idx, e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <InfoIcon sx={{ color: "primary.main" }} />
                      </InputAdornment>
                    ),
                    sx: { pr: 6 },
                  }}
                  sx={{ width: "100%" }}
                />
                <IconButton
                  onClick={() => removeExtraField(idx)}
                  sx={{
                    position: "absolute",
                    right: 0,
                    top: "50%",
                    transform: "translateY(-50%)",
                  }}
                >
                  <DeleteIcon sx={{ color: "primary.main" }} />
                </IconButton>
              </Box>
            ))}

            <Button startIcon={<AddIcon />} onClick={addExtraField}>
              Add Extra Info
            </Button>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Application date"
                maxDate={dayjs()}
                value={
                  form.applicationDate ? dayjs(form.applicationDate) : null
                }
                onChange={(newValue) => {
                  setForm((prev) => ({
                    ...prev,
                    applicationDate: newValue
                      ? newValue.format("YYYY-MM-DD")
                      : "",
                  }));
                }}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    sx: {
                      "& .MuiSvgIcon-root": {
                        color: "primary.main",
                      },
                    },
                  },
                }}
              />
            </LocalizationProvider>

            <Box sx={{ width: "100%", mt: 2 }}>
              <TextField
                select
                label="Category"
                name="category"
                value={form.category}
                onChange={handleChange}
                fullWidth
              >
                <MenuItem value="">
                  <em>Choose category</em>
                </MenuItem>
                <MenuItem value="IT & Tech">IT & Tech</MenuItem>
                <MenuItem value="Education">Education</MenuItem>
                <MenuItem value="Healthcare">Healthcare</MenuItem>
                <MenuItem value="Finance">Finance</MenuItem>
                <MenuItem value="Marketing">Marketing</MenuItem>
                <MenuItem value="Engineering">Engineering</MenuItem>
                <MenuItem value="Support">Support</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </TextField>
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                justifyContent: "center",
              }}
            >
              <Tooltip
                title="I want this"
                arrow
                componentsProps={{
                  tooltip: {
                    sx: {
                      bgcolor: "black",
                      color: "white",
                      fontSize: 12,
                      borderRadius: 1,
                      px: 1.5,
                      py: 0.5,
                    },
                  },
                  arrow: {
                    sx: {
                      color: "black",
                    },
                  },
                }}
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={form.priority === 1}
                      onChange={() => handlePriorityChange(1)}
                      sx={{
                        width: 32,
                        height: 32,
                        "& .MuiSvgIcon-root": { fontSize: 32 },
                      }}
                    />
                  }
                  label={
                    <Typography sx={{ fontWeight: "bold", fontSize: 24 }}>
                      🔥
                    </Typography>
                  }
                />
              </Tooltip>

              <Tooltip
                title="Maybe, maybe not"
                arrow
                componentsProps={{
                  tooltip: {
                    sx: {
                      bgcolor: "black",
                      color: "white",
                      fontSize: 12,
                      borderRadius: 1,
                      px: 1.5,
                      py: 0.5,
                    },
                  },
                  arrow: {
                    sx: {
                      color: "black",
                    },
                  },
                }}
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={form.priority === 2}
                      onChange={() => handlePriorityChange(2)}
                      sx={{
                        width: 32,
                        height: 32,
                        "& .MuiSvgIcon-root": { fontSize: 32 },
                      }}
                    />
                  }
                  label={
                    <Typography sx={{ fontWeight: "bold", fontSize: 24 }}>
                      🤷
                    </Typography>
                  }
                />
              </Tooltip>

              <Tooltip
                title="Ahh, I don't know"
                arrow
                componentsProps={{
                  tooltip: {
                    sx: {
                      bgcolor: "black",
                      color: "white",
                      fontSize: 12,
                      borderRadius: 1,
                      px: 1.5,
                      py: 0.5,
                    },
                  },
                  arrow: {
                    sx: {
                      color: "black",
                    },
                  },
                }}
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={form.priority === 3}
                      onChange={() => handlePriorityChange(3)}
                      sx={{
                        width: 32,
                        height: 32,
                        "& .MuiSvgIcon-root": { fontSize: 32 },
                      }}
                    />
                  }
                  label={
                    <Typography sx={{ fontWeight: "bold", fontSize: 24 }}>
                      🤦
                    </Typography>
                  }
                />
              </Tooltip>

              <Tooltip
                title="You can prioritize applications by selecting a priority level"
                arrow
                componentsProps={{
                  tooltip: {
                    sx: {
                      bgcolor: "black",
                      color: "white",
                      fontSize: 12,
                      borderRadius: 1,
                      px: 1.5,
                      py: 0.5,
                    },
                  },
                  arrow: {
                    sx: {
                      color: "black",
                    },
                  },
                }}
              >
                <InfoOutlinedIcon
                  fontSize="small"
                  sx={{ color: "primary.main" }}
                />
              </Tooltip>
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                justifyContent: "center",
              }}
            >
              <FormControlLabel
                sx={{ color: "primary.main" }}
                control={
                  <Switch
                    name="reminder"
                    checked={form.reminder}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        reminder: e.target.checked,
                        reminderDate: e.target.checked ? prev.reminderDate : "",
                      }))
                    }
                    sx={{
                      "& .MuiSwitch-track": {
                        backgroundColor: "primary.light",
                      },
                      "& .MuiSwitch-thumb": {
                        color: "primary.main",
                      },
                    }}
                  />
                }
                label="Set Reminder"
              />
              <Tooltip
                title="Set a reminder to follow up on your application if you haven’t received a response."
                arrow
                componentsProps={{
                  tooltip: {
                    sx: {
                      bgcolor: "black",
                      color: "white",
                      fontSize: 12,
                      borderRadius: 1,
                      px: 1.5,
                      py: 0.5,
                    },
                  },
                  arrow: {
                    sx: {
                      color: "black",
                    },
                  },
                }}
              >
                <InfoOutlinedIcon
                  fontSize="small"
                  sx={{ color: "primary.main" }}
                />
              </Tooltip>
            </Box>

            {form.reminder && (
              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                  flexDirection: { xs: "column", sm: "row" },
                  alignItems: "center",
                }}
              >
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Reminder date"
                    minDate={dayjs().add(1, "day")}
                    value={form.reminderDate ? dayjs(form.reminderDate) : null}
                    onChange={handleReminderDateChange}
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        sx: {
                          "& .MuiSvgIcon-root": {
                            color: "primary.main", // 🔵 gör kalender-ikonen blå
                          },
                        },
                      },
                    }}
                  />
                </LocalizationProvider>
              </Box>
            )}

            <Paper
              {...getRootProps()}
              variant="outlined"
              sx={{
                width: 300,
                minHeight: 220,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderStyle: "dashed",
                borderColor: isDragActive ? "primary.main" : "gray",
                cursor: "pointer",
                m: "0 auto",
                textAlign: "center",
                flexDirection: "column",
                p: 1,
              }}
            >
              <input {...getInputProps()} />

              <Typography>
                {isDragActive ? "Drop files here..." : "Drag & Drop files"}
              </Typography>

              {(existingFiles.length > 0 || selectedFiles.length > 0) && (
                <Box
                  sx={{
                    mt: 1,
                    display: "flex",
                    flexDirection: "column",
                    gap: 0.5,
                    // overflowY: "auto",
                    // maxHeight: "50%",
                    width: "90%",
                  }}
                >
                  {existingFiles.map((file, idx) => (
                    <Box
                      key={file.key || idx}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: 1,
                      }}
                    >
                      <Chip label={file.name} size="small" />
                      <IconButton
                        size="small"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveExistingFile(file.key);
                        }}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  ))}

                  {selectedFiles.map((file, idx) => (
                    <Box
                      key={`${file.name}-${idx}`}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: 1,
                      }}
                    >
                      <Chip label={file.name} size="small" />
                      <IconButton
                        size="small"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemoveNewFile(idx);
                        }}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  ))}
                </Box>
              )}
            </Paper>

            <Autocomplete
              key={locationResetKey}
              fullWidth
              options={locationOptions}
              loading={loadingLocations}
              value={selectedLocation}
              inputValue={locationQuery}
              isOptionEqualToValue={(option, value) =>
                option.city === value.city &&
                option.latitude === value.latitude &&
                option.longitude === value.longitude
              }
              onInputChange={(_, newInputValue) => {
                setLocationQuery(newInputValue);
              }}
              onChange={(_, selectedOption) => {
                setSelectedLocation(selectedOption);

                if (!selectedOption) {
                  setForm((prev) => ({
                    ...prev,
                    location: {
                      city: "",
                      latitude: null,
                      longitude: null,
                    },
                  }));
                  return;
                }

                setForm((prev) => ({
                  ...prev,
                  location: {
                    city: selectedOption.city,
                    latitude: selectedOption.latitude,
                    longitude: selectedOption.longitude,
                  },
                }));

                setLocationQuery(selectedOption.city);
              }}
              getOptionLabel={(option) => option.label}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Location"
                  variant="outlined"
                  InputProps={{
                    ...params.InputProps,
                    startAdornment: (
                      <>
                        <InputAdornment position="start">
                          <LocationOnIcon color="primary" />
                        </InputAdornment>
                        {params.InputProps.startAdornment}
                      </>
                    ),
                    endAdornment: (
                      <>
                        {loadingLocations ? (
                          <CircularProgress size={20} />
                        ) : null}
                        {params.InputProps.endAdornment}
                      </>
                    ),
                  }}
                />
              )}
            />

            <Button variant="contained" fullWidth onClick={handleSubmit}>
              Save changes
            </Button>
          </Box>
        </DialogContent>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={2000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default EditModal;
