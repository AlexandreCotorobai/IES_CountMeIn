import { Button } from "@/components/ui/button";
import logo from "@/assets/CountMeIn_logo.svg"; // Ajuste o caminho conforme necessário

export function Component() {
  return (
    <div className="flex min-h-screen-80">
      <main className="grid xs:grid-cols-1 justify-center items-center xl:grid-cols-2 w-full">
        {/* Ajuste o alinhamento dos itens com base no tamanho da tela */}
        <div className="xl:flex hidden justify-center xl:items-center items-start w-full h-full">
            <img src={logo} alt="CountMeIn" className="h-5/12 w-5/12"/>
        </div>
        <div className="max-w-4xl rounded-xl text-center p-6 space-y-6">
            <h1 className="xl:text-9xl md:text-8xl text-7xl dark:text-sky-100 text-cyan-900 font-normal font-['Lexend Exa']">Count Me In</h1>
            <div className="dark:bg-cyan-950 bg-sky-100 rounded-xl p-6 space-y-6">
                <div className="text-center dark:text-sky-100 text-cyan-900 text-xl font-normal font-['Ubuntu']">
                  "Count Me In" emerges as a sophisticated digital solution tailored to enhance space management and real-time occupancy control. Ideal for venues where space is at a premium, such as libraries, art galleries, and conference rooms, our service employs state-of-the-art camera technology coupled with advanced algorithms to accurately count the number of individuals within a designated area.
                  <br /><br />
                  With "Count Me In," administrators can effectively regulate the flow of visitors, ensuring safety, comfort, and compliance with occupancy guidelines. The platform delivers instantaneous visual feedback through on-site graphical displays and enables autonomous door access control, which locks or unlocks in response to the live occupancy data.
                  <br /><br />
                  Further refining management capabilities, "Count Me In" provides an online platform for administrators to adjust settings for each floor or division and a private API that delivers in-depth information for seamless integration with proprietary systems.
                  <br /><br />
                  We invite visitors and administrators alike to discover the efficiency and convenience "Count Me In" affords, transforming any venue into a smart, adaptive space. Reach out to us to learn more and begin redefining the way you manage your premises.
                  <br/><br/></div>
                <Button className="dark:text-sky-100 dark:bg-sky-400 dark:hover:bg-sky-500 bg-cyan-600 hover:bg-cyan-700 rounded-full">Contact Us</Button>
            </div>
        </div>
      </main>
    </div>
  );
}

export default Component;
