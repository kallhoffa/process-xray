import { Alert, Box, Button, Collapse, IconButton, Input, Menu, MenuItem } from '@mui/material'
import { FC, useState } from "react"
import storeElements from "../utils/storeElements"
import deleteElements from '../utils/deleteElements'
import MenuIcon from '@mui/icons-material/Menu';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';

interface ProjectBarProps {
    projectName: string,
    setProjectName: Function,
    loadedProjectName: string,
    setLoadedProjectName: Function,
    projectList: any,
    setProjectList: Function,
    nodes: any,
    edges: any
}
  


const ProjectBar: FC<ProjectBarProps> = (props): JSX.Element => {

    const { projectName, setProjectName, loadedProjectName,  setLoadedProjectName, projectList, setProjectList, nodes, edges } = props

    const [isNewProject, setIsNewProject] = useState(false)

    const handleSave = (projectName: any, nodes: any, edges: any) => {
        if(projectName !== "New Project" && projectName !== ""){
            if(!isNewProject){
                deleteElements(loadedProjectName)
                storeElements(projectName, nodes, edges)
                setProjectList(projectList.filter( (project: any) => project !== loadedProjectName).concat(projectName))
                
                setIsNewProject(false)
                setLoadedProjectName(projectName)
                setSaveAlertOpen(false)
            } else{
                storeElements(projectName, nodes, edges)
                setProjectList(projectList.concat(projectName))
                setIsNewProject(false)
                setLoadedProjectName(projectName)
                setSaveAlertOpen(false)
            }
        } else {
            setSaveAlertOpen(true)
        }
      }
    
    const handleNameUpdate = (event: any) => {
        const newName = event.target.value
        //theres a race condition here btw
        setProjectName(newName)
    }

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
        const open = Boolean(anchorEl);
        const handleProjectSelectionMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    }
    const handleProjectSelect = (projectName: any) => {
        console.log(projectName, loadedProjectName)
        setLoadedProjectName(projectName)
        setProjectName(projectName)
        setIsNewProject(projectName === "New Project")
        handleClose()
    };

    const projectMenu = projectList.map((projectName: any) => {
        return <MenuItem onClick={() => handleProjectSelect(projectName)}>{projectName}</MenuItem>
    })

    const [saveAlertOpen, setSaveAlertOpen] = useState(false);

    const saveAlert = 
    <Box sx={{
        gridColumn: '5',
        marginLeft: '10px',
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center',
    }}>
        <Collapse in={saveAlertOpen}>
        <Alert
            severity="error"
            action={
            <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                setSaveAlertOpen(false);
                }}
            >
                <CloseIcon fontSize="inherit" />
            </IconButton>
            }
            sx={{}}
        >
            Project name not valid
        </Alert>
        </Collapse>
    </Box>

        

    return (
        <Box
            sx={{
                display: "grid",
                gridTemplateColumns: "1fr 20px 500px 100px 1fr",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                margin: '0px 0px 0px 0px',
                padding: '5px 0px 5px 0px',
                bgcolor: '#ebebeb',
            }}>
                
            <IconButton
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleProjectSelectionMenu}
                sx={{
                   gridColumn: '2',
                }}
            >
                <MenuIcon />
            </IconButton>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                'aria-labelledby': 'basic-button',
                }}
            >
                {projectMenu}
                <MenuItem onClick={() => handleProjectSelect('New Project')}><AddIcon/>New Project</MenuItem>
            </Menu>
            <Box
                sx={{
                    margin: "0px 10px",
                    fontSize: "24px",
                    fontWeight: "bold",
                    gridColumn: "3",
                }}>
                <Input 
                    value={projectName}
                    disableUnderline={true}
                    onChange={(event: any) => {
                        handleNameUpdate(event)
                    }}
                    onTouchEnd={(event: any) => {
                        event.target.focus()
                    }}
                    fullWidth
                    sx = {{
                        marginTop: '2px',
                        fontSize: 30,
                        fontWeight: 'bold',
                        width: '100%',
                    }}
                />
            </Box>
            <Button 
                variant="contained" 
                onClick={() => handleSave(projectName, nodes, edges)}>
                    SAVE
            </Button>
            {saveAlert}
        </Box>
    )
}

export default ProjectBar