import { Box, Typography } from "@mui/material";
import ButtonAction from "components/shared/ButtonAction";
import Loader from "components/shared/Loader";
import { _axios } from "interceptor/http-config";
import React from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { settingsStore } from "store/settingsStore";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
const BlogView = () => {
  const { t } = useTranslation("index");
  const [direction] = settingsStore((state) => [state.direction]);
  const params = useParams();
  const navigate = useNavigate();

  const handleBack = (e) => {
    e.preventDefault();
    navigate(-1);
  };

  const { data, isLoading } = useQuery(
    ["blog", "id-" + params.id],
    async () => {
      return await _axios
        .get("/blog/" + params.id, {
          headers: {
            translations: "yes",
          },
        })
        .then((res) => res.data?.data);
    },
    {}
  );

  const columns = [
    {
      head: t("title"),
      value: data?.translations?.find((t) => t.locale === "fr")?.title,
    },
    {
      head: t("title"),
      value: data?.translations?.find((t) => t.locale === "ar")?.title,
    },
    // {
    //   head: t("title"),
    //   value: data?.translations?.find((t) => t.locale === "tr")?.title,
    // },
  ];
  const texts = [
    {
      head: t("text"),
      value: data?.translations?.find((t) => t.locale === "fr")?.text,
    },
    {
      head: t("text"),
      value: data?.translations?.find((t) => t.locale === "ar")?.text,
    },
    // {
    //   head: t("text"),
    //   value: data?.translations?.find((t) => t.locale === "tr")?.text,
    // },
  ];

  return (
    <>
      {isLoading && <Loader />}
      {!!data && (
        <div>
          <Typography
            sx={{
              backgroundColor: "card.main",
              borderRadius: "5px",
              color: "primary.main",
              width: "40%",
              marginInline: "auto",
              height: "100%",
              textTransform: "uppercase",
              padding: "10px 20px",
              textAlign: "center",
            }}
            variant="h5"
          >
            {data.name}
          </Typography>
          <Box
            key={params.id}
            sx={{
              display: "flex",
              color: "lightGray.main",
              columnGap: 10,
              marginTop: "4%",
              justifyContent: "center",
            }}
          >
            <Box
              hover
              sx={{
                display: "flex",
                justifyContent: "center",
                color: "text.main",
                height: "100%",
                flexWrap: "wrap",
                columnGap: 2,
              }}
            >
              <Box
                sx={{
                  width: "70%",
                  backgroundColor: "card.main",
                  borderRadius: "5px",
                  padding: "20px",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    rowGap: 2.1,
                  }}
                >
                  <h3>{t("Details")}</h3>
                  <Box
                    sx={{
                      display: "flex",
                      width: "100%",
                      flexWrap: "wrap",
                    }}
                  >
                    {columns?.map((item, index, id) => (
                      <Box
                        key={id}
                        sx={{
                          display: "flex",
                          pl: "10px",
                          width: "50%",
                          my: "5px",
                        }}
                      >
                        <Typography
                          variant="p"
                          sx={{
                            fontWeight: "700",
                            fontSize: "15px",
                            marginInlineEnd: "15px",
                          }}
                        >
                          {item.head}:
                        </Typography>
                        <Typography variant="p">
                          {typeof item?.value === "object"
                            ? JSON.stringify(item?.value)
                            : item?.value ?? "null"}
                        </Typography>
                      </Box>
                    ))}
                    {texts?.map((item, index, id) => (
                      <Box
                        key={id}
                        sx={{
                          display: "flex",
                          pl: "10px",
                          width: "80%",
                          my: "5px",
                        }}
                      >
                        <Typography
                          variant="p"
                          sx={{
                            fontWeight: "700",
                            fontSize: "15px",
                            marginInlineEnd: "15px",
                          }}
                        >
                          {item.head}:
                        </Typography>
                        <Typography
                          variant="p"
                          dangerouslySetInnerHTML={{
                            __html: item?.value,
                          }}
                        ></Typography>
                      </Box>
                    ))}
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </div>
      )}

      <div
        style={{
          minWidth: "200px",
          float: direction === "ltr" ? "right" : "left",
          marginTop: "20px",
        }}
      >
        <ButtonAction
          name={t("Back")}
          onClick={handleBack}
          endIcon={direction === "ltr" ? <ArrowForward /> : <ArrowBack />}
        />
      </div>
    </>
  );
};

export default BlogView;
