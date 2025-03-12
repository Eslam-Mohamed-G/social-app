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
import ForumIcon from '@mui/icons-material/Forum';
import { PostsI } from '@/interfaces/Posts';
import Box from '@mui/material/Box';

export default function Post({ post }: { post: PostsI }) {

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
                subheader={post.createdAt}
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

                <Box>
                    <IconButton sx={{ padding: "0px" }} aria-label="comment">
                        <ForumIcon />
                    </IconButton>
                    <Typography sx={{ fontSize: "12px", textAlign: "center", padding: "0" }}>{post.comments.length}</Typography>
                </Box>

                <Box sx={{ flexGrow: "1", textAlign: "end", justifyContent: "end" }}>
                    <IconButton aria-label="add to favorites">
                        <FavoriteIcon />
                    </IconButton>
                </Box>
            </CardActions>
        </Card>
    );
}
