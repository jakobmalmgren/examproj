import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";

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
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle
        sx={{
          m: 0,
          p: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {file.name}

        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        {isPdf && (
          <iframe
            src={file.url}
            title={file.name}
            width="100%"
            height="500"
            style={{ border: "none" }}
          />
        )}

        {isImage && (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <img
              src={file.url}
              alt={file.name}
              style={{
                width: "100%",
                maxHeight: "500px",
                objectFit: "contain",
                borderRadius: 8,
              }}
              onError={() => {
                console.log(
                  "Image failed to load:",
                  file.url,
                  file.contentType,
                );
              }}
            />

            {/* <Button
              variant="outlined"
              onClick={() => window.open(file.url, "_blank")}
            >
              Öppna bilden i ny flik
            </Button> */}
          </Box>
        )}

        {/* {!isPdf && !isImage && (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Typography>
              Den här filtypen kan inte förhandsvisas här.
            </Typography>

            <Button
              variant="contained"
              onClick={() => window.open(file.url, "_blank")}
            >
              Öppna fil
            </Button>
          </Box>
        )} */}
      </DialogContent>
    </Dialog>
  );
};

export default FileViewerModal;
