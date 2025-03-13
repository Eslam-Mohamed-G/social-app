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
import { PostsI } from '@/interfaces/Posts';
import Box from '@mui/material/Box';
import Comment from './Comment';
import Link from 'next/link';

export default function Post({ post }: { post: PostsI }) {
    const formatTime = (dataString: string) => {
        const date = new Date(dataString)
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`
    }

    return (
        <Card>
            <CardHeader
                avatar={
                    <Avatar src={post.user.photo} alt={post.user.name} sx={{ bgcolor: red[500] }} aria-label="recipe" />
                }
                action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon />
                    </IconButton>
                }
                title={post.user.name}
                subheader={`${post.createdAt.split("T")[0]} ${formatTime(post.createdAt)}`}
                slotProps={{
                    title: { color: "#1976d2" },
                    subheader: { color: "black" }
                }}
            />

            {post?.body &&
                <CardContent>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        {post.body}
                    </Typography>
                </CardContent>
            }

            {post?.image &&
                <CardMedia
                    component="img"
                    height="194"
                    image={post?.image}
                    alt="Image"
                />
            }

            <CardActions disableSpacing sx={{ justifyContent: "end", gap: "20px" }}>
                <IconButton aria-label="share">
                    <ShareIcon />
                </IconButton>

                <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Link href={"/posts/" + post._id}>
                        <IconButton aria-label="comment">
                            <CommentBankIcon />
                        </IconButton>
                    </Link>
                    <Typography sx={{ fontSize: "12px" }}>{post.comments.length}</Typography>
                </Box>

                <Box sx={{ flexGrow: "1", textAlign: "end", justifyContent: "end" }}>
                    <IconButton aria-label="add to favorites">
                        <FavoriteIcon />
                    </IconButton>
                </Box>
            </CardActions>
            {/* comment */}
            <Comment comment={post.comments[0]}/>
        </Card>
    );
}
