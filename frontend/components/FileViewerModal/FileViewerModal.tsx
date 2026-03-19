import { Dialog, DialogTitle, DialogContent, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface FileViewerModalProps {
  open: boolean;
  onClose: () => void;
  fileUrl: string;
  fileType?: "pdf" | "docx"; // för olika typer
}

const FileViewerModal = ({
  open,
  onClose,
  fileUrl,
  fileType = "pdf",
}: FileViewerModalProps) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        Dokument
        <IconButton
          onClick={onClose}
          sx={{ position: "absolute", right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        {fileType === "pdf" ? (
          <iframe
            src={fileUrl}
            width="100%"
            height="600px"
            title="Dokument"
            style={{ border: "none" }}
          />
        ) : (
          <iframe
            src={`https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(fileUrl)}`}
            width="100%"
            height="600px"
            title="Word Dokument"
            style={{ border: "none" }}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default FileViewerModal;
