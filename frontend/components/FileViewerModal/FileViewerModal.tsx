import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import { Button, Typography } from "@mui/material";

type Props = {
  open: boolean;
  onClose: () => void;
  file: {
    name: string;
    url: string;
    contentType?: string;
  } | null;
};

const FileViewerModal = ({ open, onClose, file }: Props) => {
  if (!file) return null;

  const fileName = file.name?.toLowerCase() || "";
  const contentType = file.contentType?.toLowerCase() || "";

  const isImage =
    contentType.startsWith("image/") ||
    fileName.endsWith(".png") ||
    fileName.endsWith(".jpg") ||
    fileName.endsWith(".jpeg") ||
    fileName.endsWith(".webp") ||
    fileName.endsWith(".gif") ||
    fileName.endsWith(".avif");

  const isPdf = contentType === "application/pdf" || fileName.endsWith(".pdf");

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      slotProps={{
        paper: {
          sx: {
            mx: { xs: 1, sm: 2 },
            width: { xs: "calc(100% - 16px)", sm: "100%" },
            maxWidth: { xs: "calc(100% - 16px)", sm: 600 },
            borderRadius: { xs: 2, sm: 3 },
            overflowX: "hidden",
            transform: { xs: "scale(0.95)", sm: "scale(1)" },
            transformOrigin: "top center",
          },
        },
      }}
    >
      <DialogTitle
        sx={{
          m: 0,
          p: 2,
          pr: 6,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontSize: { xs: "0.95rem", sm: "1.25rem" },
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {file.name}
        </Typography>

        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent
        sx={{
          overflowX: "hidden",
          px: { xs: 1.5, sm: 3 },
          pb: { xs: 2, sm: 3 },
          display: "flex",
          justifyContent: "center",
        }}
      >
        {isPdf && (
          <Box
            sx={{
              width: "100%",
              overflow: "hidden",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Box
              component="iframe"
              src={file.url}
              title={file.name}
              sx={{
                width: "100%",
                height: { xs: 400, sm: 500 },
                border: "none",
                display: "block",
              }}
            />
          </Box>
        )}

        {isImage && (
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
              overflow: "hidden",
            }}
          >
            <Box
              component="img"
              src={file.url}
              alt={file.name}
              sx={{
                display: "block",
                width: { xs: "85%", sm: "100%" },
                maxWidth: "100%",
                height: "auto",
                maxHeight: { xs: "50vh", sm: "70vh" },
                objectFit: "contain",
                borderRadius: 2,
                mx: "auto",
              }}
              onError={() => {
                console.log(
                  "Image failed to load:",
                  file.url,
                  file.contentType,
                );
              }}
            />

            <Button
              variant="outlined"
              fullWidth
              onClick={() => window.open(file.url, "_blank")}
            >
              Öppna bilden i ny flik
            </Button>
          </Box>
        )}

        {!isPdf && !isImage && (
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <Typography>
              Den här filtypen kan inte förhandsvisas här.
            </Typography>

            <Button
              variant="contained"
              fullWidth
              onClick={() => window.open(file.url, "_blank")}
            >
              Öppna fil
            </Button>
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default FileViewerModal;
