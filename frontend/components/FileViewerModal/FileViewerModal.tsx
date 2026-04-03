import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import { FileViewerProps } from "../../frontendTypes/frontendTypes";

const FileViewerModal = ({ open, onClose, file }: FileViewerProps) => {
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
      maxWidth="md"
      slotProps={{
        paper: {
          sx: {
            mx: { xs: 1, sm: 2 },
            width: { xs: "calc(100% - 16px)", sm: "100%" },
            maxWidth: { xs: "calc(100% - 16px)", sm: 900 },
            minHeight: { xs: "70vh", sm: "80vh" },
            maxHeight: { xs: "92vh", sm: "90vh" },
            borderRadius: { xs: 2, sm: 3 },
            overflow: "hidden",
          },
        },
      }}
    >
      <DialogTitle
        sx={{
          minHeight: "56px",
          p: 1.5,
          position: "relative",
        }}
      >
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
            zIndex: 2,
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent
        sx={{
          overflow: "hidden",
          px: { xs: 1.5, sm: 2.5 },
          pb: { xs: 2, sm: 2.5 },
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {isPdf && (
          <Box
            sx={{
              width: "100%",
              height: "100%",
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
                height: { xs: "72vh", sm: "78vh" },
                border: "none",
                display: "block",
                borderRadius: 1,
              }}
            />
          </Box>
        )}

        {isImage && (
          <Box
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
            }}
          >
            <Box
              component="img"
              src={file.url}
              alt={file.name}
              sx={{
                display: "block",
                width: "100%",
                maxWidth: "100%",
                height: "auto",
                maxHeight: { xs: "72vh", sm: "78vh" },
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
          </Box>
        )}

        {!isPdf && !isImage && <Box sx={{ width: "100%" }} />}
      </DialogContent>
    </Dialog>
  );
};

export default FileViewerModal;
