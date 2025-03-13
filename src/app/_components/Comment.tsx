import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CommentBankIcon from '@mui/icons-material/CommentBank';
import Box from '@mui/material/Box';
import { CommentI } from '@/interfaces/comment';

export default function Comment({ comment }: { comment: CommentI }) {
    const formatTime = (dataString: string) => {
        const date = new Date(dataString)
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`
    }
    return (
        <Box bgcolor={"#eee"} borderTop={"1px solid #ccc"}>
            <CardHeader
                avatar={
                    <Avatar src={comment.commentCreator.photo} alt={comment.commentCreator.name} sx={{ bgcolor: red[500] }} aria-label="recipe" />
                }
                action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon />
                    </IconButton>
                }
                title={
                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <Typography sx={{ fontSize: "14px" }}>{comment.commentCreator.name}</Typography>
                        <Typography sx={{ fontSize: "12px" }}>{`${formatTime(comment.createdAt)} | ${comment.createdAt.split("T")[0]}`}</Typography>
                    </Box>
                }
                subheader={
                    <Typography>{comment.content}</Typography>
                }
                slotProps={{
                    title: { color: "#1976d2" },
                    subheader: { color: "black" }
                }}
            />
        </Box>
    )
}
