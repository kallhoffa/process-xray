import { Alert, Box, Button, Collapse, IconButton, Input, Menu, MenuItem } from '@mui/material'
import { useEffect, useState } from "react"
import saveProject from "../utils/saveProject"
import MenuIcon from '@mui/icons-material/Menu';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import { useRecoilState, useRecoilValue, } from 'recoil';
import { activeProjectState, edgesState, nodesState, projectListState, desiredProjectNameState } from '../store';
  


const ProjectBar = (): JSX.Element => {

    const [desiredProjectName, setDesiredProjectName] = useRecoilState(desiredProjectNameState);

    const [activeProject, setActiveProject] = useRecoilState(activeProjectState);
    const [projectList, setProjectList] = useRecoilState(projectListState)
    const nodes = useRecoilValue(nodesState);
    const edges  = useRecoilValue(edgesState);

    useEffect(() => {
        setDesiredProjectName(activeProject.name) 
    }, [activeProject, setDesiredProjectName])

    const handleSave = async () => {
        if(desiredProjectName !== "New Project" && desiredProjectName !== ""){
            const projectId = await saveProject(activeProject.id, desiredProjectName, nodes, edges)
            setProjectList(projectList.filter(project => project.id !== activeProject.id).concat({name: desiredProjectName, id: projectId, new: false}))
            
            setActiveProject({id: projectId!, name: desiredProjectName, new: false})
            setSaveAlertOpen(false)
        } else {
            setSaveAlertOpen(true)
        }
      }
    
    const handleNameUpdate = (event: any) => {
        const newName = event.target.value
        //theres a race condition here btw
        setDesiredProjectName(newName)
    }

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
        const open = Boolean(anchorEl);
        const handleProjectSelectionMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    }

    const newProjectObj = {
        id: "",
        name: "New Project",
        owners: [],
        editors: [],
        viewers: [],
        edges: [],
        nodes: []
    }

    const handleProjectSelect = (project: any) => {
        setActiveProject({...project, new: project.name === "New Project"})
        setDesiredProjectName("New Project")
        handleClose()
    };

    const projectMenu = projectList.map((project: any) => {

        return  <MenuItem key={project.id} onClick={() => handleProjectSelect(project)}>{project.name}</MenuItem>
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
                <MenuItem onClick={() => handleProjectSelect(newProjectObj)}><AddIcon/>New Project</MenuItem>
            </Menu>
            <Box
                sx={{
                    margin: "0px 10px",
                    fontSize: "24px",
                    fontWeight: "bold",
                    gridColumn: "3",
                }}>
                <Input 
                    value={desiredProjectName}
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
                onClick={() => handleSave()}>
                    SAVE
            </Button>
            {saveAlert}
        </Box>
    )
}

export default ProjectBar