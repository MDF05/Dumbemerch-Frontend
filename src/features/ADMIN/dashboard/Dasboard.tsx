import {
  Box,
  Flex,
  Text,
  Select,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  useColorModeValue,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { apiV1 } from "../../../lib/api-v1";

export default function AdminDashboard() {
  const [period, setPeriod] = useState("month");
  const [stats, setStats] = useState<any>({
    products: 0,
    users: 0,
    carts: 0,
    transactionCount: 0,
    totalSales: 0,
  });

  const bg = useColorModeValue("gray.800", "gray.700");

  useEffect(() => {
    apiV1
      .get(`/admin/dashboard?period=${period}`)
      .then((res) => setStats(res.data.content))
      .catch((err) => {
        console.error("Dashboard fetch error:", err);
        setStats({}); // supaya tidak undefined
      });
  }, [period]);

  const data = [
    { name: "Products", value: stats.products || 0 },
    { name: "Users", value: stats.users || 0 },
    { name: "Carts", value: stats.carts || 0 },
    { name: "Sales", value: stats.transactionCount || 0 },
  ];

  return (
    <Box p={10} color="white" pt={"20"} h={"100vh"} overflowY={"scroll"}>
      <Flex justify="space-between" align="center" mb={6}>
        <Text
          fontSize="3xl"
          fontWeight="bold"
          color="red.400"
          textShadow="0 0 10px red"
        >
          Admin Dashboard
        </Text>
        <Select
          w="200px"
          bg="red.700"
          border="none"
          color="black"
          onChange={(e) => setPeriod(e.target.value)}
          value={period}
        >
          <option value="day">Daily</option>
          <option value="week">Weekly</option>
          <option value="month">Monthly</option>
          <option value="year">Yearly</option>
        </Select>
      </Flex>

      <SimpleGrid columns={[1, 2, 4]} spacing={6}>
        <Stat bg={bg} p={5} rounded="2xl" boxShadow="lg">
          <StatLabel>Products</StatLabel>
          <StatNumber>{stats?.products || 0}</StatNumber>
        </Stat>
        <Stat bg={bg} p={5} rounded="2xl" boxShadow="lg">
          <StatLabel>Users</StatLabel>
          <StatNumber>{stats?.users || 0}</StatNumber>
        </Stat>
        <Stat bg={bg} p={5} rounded="2xl" boxShadow="lg">
          <StatLabel>Carts</StatLabel>
          <StatNumber>{stats?.carts || 0} </StatNumber>
        </Stat>
        <Stat bg={bg} p={5} rounded="2xl" boxShadow="lg">
          <StatLabel>Sales</StatLabel>
          <StatNumber>
            Rp {stats?.totalSales?.toLocaleString("id-ID") || 0}
          </StatNumber>
        </Stat>
      </SimpleGrid>

      <Box mt={10} h="400px">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(255,255,255,0.2)"
            />
            <XAxis dataKey="name" stroke="white" />
            <YAxis stroke="white" />
            <Tooltip />
            <Bar dataKey="value" fill="#E53E3E" radius={10} />
          </BarChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
}
