import { Box, Button, IconButton } from "@material-ui/core"
import { FC } from "react"
import storeElements from "../utils/storeElements"
import MenuIcon from '@mui/icons-material/Menu';

const handleSave = (projectName: any, nodes: any, edges: any) => {
    console.log(nodes, edges)
    storeElements(projectName, nodes, edges)
  }

interface ProjectBarProps {
    projectName: string,
    nodes: any,
    edges: any
}
  


const ProjectBar: FC<ProjectBarProps> = (props): JSX.Element => {

    const { projectName, nodes, edges } = props

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                margin: '0px 0px 0px 0px',
                padding: '5px 0px 5px 0px',
                bgcolor: '#ebebeb',
            }}>
                
            <IconButton>
                <MenuIcon />
            </IconButton>
            <Box
                sx={{
                    margin: "0px 100px",
                    fontSize: "24px",
                    fontWeight: "bold",
                }}>
                {projectName}
            </Box>
            <Button 
                variant="contained" 
                onClick={() => handleSave(projectName, nodes, edges)}>
                    SAVE
            </Button>
        </Box>
    )
}

export default ProjectBar