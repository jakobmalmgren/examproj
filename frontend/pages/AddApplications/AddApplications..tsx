import { useEffect, useState } from "react";
import { createApplication } from "../../apis/createApplication";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import dayjs, { Dayjs } from "dayjs";
import { getUploadUrl } from "../../apis/getUploadUrl";

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

const initialForm = {
  title: "",
  extraInfo: [""],
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

const AddApplications = () => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [form, setForm] = useState(initialForm);
  const [selectedLocation, setSelectedLocation] =
    useState<LocationOption | null>(null);
  const [locationResetKey, setLocationResetKey] = useState(0);
  const [locationQuery, setLocationQuery] = useState("");
  const [locationOptions, setLocationOptions] = useState<LocationOption[]>([]);
  const [loadingLocations, setLoadingLocations] = useState(false);

  // skickas in i utils el nåt..!!!
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
    setForm((prev) => ({
      ...prev,
      extraInfo: prev.extraInfo.filter((_, i) => i !== index),
    }));
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

  //varför File..??

  const onDrop = (acceptedFiles: File[]) => {
    setSelectedFiles((prev) => [...prev, ...acceptedFiles]);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

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

        const data = await response.json();

        const options: LocationOption[] =
          data?.features?.map((feature: any) => ({
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
        files: uploadedFiles,
      };

      const res = await createApplication(cleanedForm);
      console.log("result", res);

      if (res.success) {
        setForm(initialForm);
        setSelectedFiles([]);
        setLocationQuery("");
        setLocationOptions([]);
        setSelectedLocation(null);
        setLocationResetKey((prev) => prev + 1);
        setSelectedFiles([]);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 3,
        p: 2,
        width: "50%",
        margin: "0 auto",
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
        <Box key={idx} sx={{ position: "relative", width: "100%", mb: 1 }}>
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
        <Tooltip title="I want this!!" arrow>
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

        <Tooltip title="Maybe, maybe not" arrow>
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

        <Tooltip title="Ahh, I don't know" arrow>
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
        >
          <InfoOutlinedIcon fontSize="small" sx={{ color: "primary.main" }} />
        </Tooltip>
      </Box>

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
              value={form.reminderDate ? dayjs(form.reminderDate) : null}
              onChange={handleReminderDateChange}
              slotProps={{
                textField: {
                  fullWidth: true,
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
          height: 300,
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

        {selectedFiles.length > 0 && (
          <Box
            sx={{
              mt: 1,
              display: "flex",
              flexDirection: "column",
              gap: 0.5,
              overflowY: "auto",
              maxHeight: "50%",
              width: "90%",
            }}
          >
            {selectedFiles.map((file, idx) => (
              <Chip key={idx} label={file.name} size="small" />
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
                  {loadingLocations ? <CircularProgress size={20} /> : null}
                  {params.InputProps.endAdornment}
                </>
              ),
            }}
          />
        )}
      />

      <Button variant="contained" fullWidth onClick={handleSubmit}>
        Submit
      </Button>
    </Box>
  );
};

export default AddApplications;
