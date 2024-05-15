import { Box, Paper } from "@mui/material";
import CreateShortenedURLForm from "@/components/forms/CreateShortenedURLForm";
import auth from "@/utils/functools/auth";
import { db } from "@/server/db";
import Dashboard_ShortenedURL from "@/components/ui/dashboard/ShortenedURL";

export default async function DashboardPage() {
  const session = await auth();
  const items = await db.shortenedURL.findMany({
    where: {
      userId: session.user.id,
    },
    include: {
      _count: {
        select: {
          clicks: true,
        },
      },
    },
    orderBy: {
      // clicks: {
      //     _count: "desc"
      //
      // }
      createdAt: "desc",
    },
  });

  return (
    <Box>
      <CreateShortenedURLForm />

      <Box
        sx={{
          py: 4,
        }}
      >
        {items.map((item) => (
          <Dashboard_ShortenedURL
            key={`${item.id}-dashboard-shortened-url-item`}
            data={item}
          />
        ))}
      </Box>
    </Box>
  );
}
