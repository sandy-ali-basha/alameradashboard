import {
  Typography,
  Box,
  Button,
  Card,
  CardMedia,
  CardContent,
  Grid,
  CardActions,
  IconButton,
  Tooltip,
} from "@mui/material";
import { BoxStyled } from "components/styled/BoxStyled";
import React, { useCallback, useState } from "react";
import Loader from "components/shared/Loader";
import { colorStore } from "store/ColorsStore";
import { useHome } from "hooks/home/useHome";
import HomeUpdate from "./HomeUpdate";
import { Add, Edit } from "@mui/icons-material";
import { useNav } from "hooks/home/useNav";
import NavUpdate from "./NavUpdate";
import HomeCreate from "./HomeCreate";
import DeleteDialog from "../components/Dialog";

const HomeIndex = () => {
  const { data, isLoading } = useHome();
  const { data: navData, isLoading: navIsLoading } = useNav();
  const [navUpdate, setNavUpdate] = useState();
  const [createdID, setcreatedID] = useState();
  const [create, setCreate] = useState(false);
  const [type, setType] = useState();
  const [editedID, setEditedID] = colorStore((state) => [
    state.editedID,
    state.setEditedID,
  ]);
  const handleEdit = useCallback(
    (id, type) => {
      setEditedID(id);
      setType(type);
    },
    [setEditedID, setType]
  );
  const handleEditNav = useCallback(
    (id) => {
      setNavUpdate(id);
    },
    [setNavUpdate]
  );
  const handleCreate = useCallback(
    (id, type) => {
      setCreate(true);
      setcreatedID(id);
      setType(type);
    },
    [setcreatedID]
  );

  return (
    <>
      {isLoading && <Loader />}
      {editedID && <HomeUpdate id={editedID} type={type} />}
      {navUpdate && <NavUpdate id={navUpdate} setId={setNavUpdate} />}

      <HomeCreate
        type={type}
        open={create}
        setOpen={setCreate}
        id={createdID}
      />

      <BoxStyled sx={{ my: 2, px: 2 }}>
        <Typography sx={{ my: 2 }} variant="body1" color="initial">
          Navbar
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "space-evenly" }}>
          {navData?.data?.navbar?.map((item, idx) => (
            <Card key={idx}>
              <CardContent sx={{ display: "flex", gap: 3 }}>
                <Typography variant="body1">{item.text}</Typography>
                <Typography variant="body1">{item.link}</Typography>
                <Edit onClick={() => handleEditNav(item?.id)} />
              </CardContent>
            </Card>
          ))}
        </Box>
      </BoxStyled>

      <BoxStyled sx={{ my: 2, px: 2 }}>
        <Typography sx={{ my: 2 }} variant="body1" color="initial">
          Slider 1
        </Typography>

        {data?.data?.home_sections
          ?.filter((section) => section.type === "slider") // Filter sections of type "banner"
          .map((section, idx) => (
            <Box key={section.id}>
              <IconButton onClick={() => handleCreate(section?.id, "slider")}>
                <Add />
              </IconButton>
              {section.items.map((item) => (
                <Card key={item.id} sx={{ mt: 2 }}>
                  <CardMedia
                    component="img"
                    height="300"
                    image={item.image}
                    alt={item.title}
                  />
                  <CardContent>
                    <Typography variant="h6">{item.title}</Typography>
                    <Typography
                      variant="body2"
                      dangerouslySetInnerHTML={{
                        __html: item.description,
                      }}
                    ></Typography>
                    <Button
                      href={item.cta_link}
                      target="_blank"
                      variant="contained"
                      sx={{ mt: 1 }}
                    >
                      link
                    </Button>
                  </CardContent>
                  <CardActions>
                    <IconButton onClick={() => handleEdit(item?.id, "slider")}>
                      <Edit />
                    </IconButton>
                    <IconButton>
                      <Tooltip title={"Delete"}>
                        <DeleteDialog id={item?.id} />
                      </Tooltip>
                    </IconButton>
                  </CardActions>
                </Card>
              ))}
            </Box>
          ))}
      </BoxStyled>

      <BoxStyled sx={{ my: 2, px: 2 }}>
        <Typography sx={{ my: 2 }} variant="body1" color="initial">
          Slider 2
        </Typography>
        {data?.data?.home_sections
          ?.filter((section) => section.type === "slider2") // Filter sections of type "banner"
          .map((section, idx) => (
            <Box key={section.id}>
              <IconButton onClick={() => handleCreate(section?.id, "slider2")}>
                <Add />
              </IconButton>
              {section.items.map((item) => (
                <Card key={item.id} sx={{ mt: 2 }}>
                  <CardMedia
                    component="img"
                    height="300"
                    image={item.image}
                    alt={item.title}
                  />
                  <CardContent>
                    <Typography variant="h6">{item.title}</Typography>
                    <Typography
                      variant="body2"
                      dangerouslySetInnerHTML={{
                        __html: item.description,
                      }}
                    ></Typography>
                    <Button
                      href={item.cta_link}
                      target="_blank"
                      variant="contained"
                      sx={{ mt: 1 }}
                    >
                      link
                    </Button>
                  </CardContent>
                  <CardActions>
                    <IconButton onClick={() => handleEdit(item?.id, "slider")}>
                      <Edit />
                    </IconButton>
                    <IconButton>
                      <Tooltip title={"Delete"}>
                        <DeleteDialog id={item?.id} />
                      </Tooltip>
                    </IconButton>
                  </CardActions>
                </Card>
              ))}
            </Box>
          ))}
      </BoxStyled>

      <BoxStyled sx={{ my: 2, px: 2 }}>
        <Typography sx={{ my: 2 }} variant="body1" color="initial">
          collections
        </Typography>
        {data?.data?.home_sections
          ?.filter((section) => section.type === "collections") // Filter sections of type "banner"
          .map((section, idx) => (
            <>
              <IconButton
                onClick={() => handleCreate(section?.id, "collections")}
              >
                <Add />
              </IconButton>
              <Grid container key={section.id}>
                {section.items.map((item) => (
                  <Grid
                    item
                    md="4"
                    sm="6"
                    xs="12"
                    key={item.id}
                    sx={{ mt: 2, p: 1 }}
                  >
                    <CardMedia
                      component="img"
                      height="250"
                      image={item.image}
                      alt={item.title}
                    />
                    <CardContent>
                      <Typography variant="h6" color="initial">
                        {item.title}
                      </Typography>
                      <Button
                        href={item.cta_link}
                        target="_blank"
                        variant="outlined"
                        sx={{ mt: 1 }}
                      >
                        link
                      </Button>
                    </CardContent>
                    <CardActions>
                      <IconButton
                        onClick={() => handleEdit(item?.id, "collections")}
                      >
                        <Edit />
                      </IconButton>
                      <IconButton>
                        <Tooltip title={"Delete"}>
                          <DeleteDialog id={item?.id} />
                        </Tooltip>
                      </IconButton>
                    </CardActions>
                  </Grid>
                ))}
              </Grid>
            </>
          ))}
      </BoxStyled>

      <BoxStyled sx={{ my: 2, px: 2 }}>
        <Typography sx={{ my: 2 }} variant="body1" color="initial">
          categories
        </Typography>
        {data?.data?.home_sections
          ?.filter((section) => section.type === "categories") // Filter sections of type "banner"
          .map((section, idx) => (
            <>
              <IconButton
                onClick={() => handleCreate(section?.id, "categories")}
              >
                <Add />
              </IconButton>
              <Grid container key={section.id}>
                {section.items.map((item) => (
                  <Grid item md="2" sm="6" xs="12" key={item.id} sx={{ p: 1 }}>
                    <CardMedia
                      component="img"
                      sx={{ aspectRatio: "1" }}
                      image={item.image}
                      alt={item.title}
                    />
                    <CardContent>
                      <Typography color="text.primary" variant="h6">
                        {item.title}
                      </Typography>
                      <Typography
                        color="text.primary"
                        variant="body1"
                        dangerouslySetInnerHTML={{
                          __html: item.description,
                        }}
                      ></Typography>
                    </CardContent>
                    <CardActions>
                      <IconButton
                        onClick={() => handleEdit(item?.id, "categories")}
                      >
                        <Edit />
                      </IconButton>
                      <IconButton>
                        <Tooltip title={"Delete"}>
                          <DeleteDialog id={item?.id} />
                        </Tooltip>
                      </IconButton>
                    </CardActions>
                    <Button
                      href={item.cta_link}
                      target="_blank"
                      variant="outlined"
                      sx={{ mt: 1 }}
                    >
                      link
                    </Button>
                  </Grid>
                ))}
              </Grid>
            </>
          ))}
      </BoxStyled>

      <BoxStyled sx={{ my: 2, px: 2 }}>
        <Typography sx={{ my: 2 }} variant="body1" color="initial">
          Banner
        </Typography>
        {data?.data?.home_sections
          ?.filter((section) => section.type === "banner") // Filter sections of type ""
          .map((section, idx) => (
            <>
              <Grid container key={section.id}>
                <IconButton onClick={() => handleCreate(section?.id, "banner")}>
                  <Add />
                </IconButton>
                {section.items.map((item) => (
                  <Grid item md="6" xs="12" key={item.id} sx={{ p: 1 }}>
                    <CardMedia
                      component="img"
                      height="130"
                      image={item.image}
                      alt={item.title}
                    />
                    <CardContent>
                      <Typography variant="h6" color="initial">
                        {item.title}
                      </Typography>
                      <Typography variant="body2"  dangerouslySetInnerHTML={{
                        __html: item.description,
                      }} color="initial">
                      </Typography>
                      <Button
                        href={item.cta_link}
                        target="_blank"
                        variant="outlined"
                        sx={{ mt: 1 }}
                      >
                        link
                      </Button>
                    </CardContent>
                    <CardActions>
                      <IconButton
                        onClick={() => handleEdit(item?.id, "banner")}
                      >
                        <Edit />
                      </IconButton>
                      <IconButton>
                        <Tooltip title={"Delete"}>
                          <DeleteDialog id={item?.id} />
                        </Tooltip>
                      </IconButton>
                    </CardActions>
                  </Grid>
                ))}
              </Grid>
            </>
          ))}
      </BoxStyled>
    </>
  );
};

export default HomeIndex;
